const { Service, User } = require("../models/index");
const formatThousand = require("../helpers/formatThousand");
const { Op } = require("sequelize");
class Controller {
  static showSessionData(req, res) {
    const { authenticated, user, cart } = req.session;
    res.send({ authenticated, user, cart });
  }
  static showLandingPage(req, res) {
    const isLoggedIn = req.session.authenticated;
    res.render("landing-page", {
      isLoggedIn,
      session: req.session,
    });
  }
  static showCakes(req, res) {
    const isLoggedIn = req.session.authenticated;
    const session = req.session;
    const { search, filter } = req.query;
    if (search) {
      Service.findAll({
        include: { model: User },
        where: {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        },
      })
        .then((data) => {
          // console.log(data);
          res.render("cakes", {
            cakes: data,
            isLoggedIn,
            session,
            formatThousand,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    } else if (filter) {
      Service.getServiceByAvailability(filter)
        .then((data) => {
          // console.log(data);
          // console.log(filter);
          res.render("cakes", {
            cakes: data,
            isLoggedIn,
            session,
            formatThousand,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      Service.findAll({
        include: { model: User },
      })
        .then((data) => {
          // console.log(data);
          res.render("cakes", {
            cakes: data,
            isLoggedIn,
            session,
            formatThousand,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  static addCakeToCart(req, res) {
    const { id } = req.params;
    if (req.session.authenticated) {
      const session = req.session;
      if (!session.cart) session.cart = [];
      Service.findByPk(+id, { where: { isActive: true } })
        .then((service) => {
          if (service) session.cart.push(service);
          res.redirect("/cakes");
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    }
  }
  static showVendors(req, res) {
    const isLoggedIn = req.session.authenticated;
    const session = req.session;
    User.findAll({
      where: {
        roles: "Vendor",
      },
    })
      .then((data) => {
        res.render("vendors", { vendors: data, isLoggedIn, session });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static showVendorById(req, res) {
    const { id } = req.params;
    const isLoggedIn = req.session.authenticated;
    const session = req.session;
    User.findByPk(id, {
      include: {
        model: Service,
      },
    })
      .then((data) => {
        // console.log(data);
        res.render("vendorDetails", {
          vendors: data,
          isLoggedIn,
          session,
          formatThousand,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static cart(req, res) {
    const { authenticated, user, cart } = req.session;
    const isLoggedIn = authenticated;
    const session = req.session;
    console.log(cart);
    const filteredCart = cart?.filter((el) => {
      return el.isActive === true;
    });
    // console.log(filteredCart);
    res.render("cart", {
      user,
      cart: filteredCart,
      isLoggedIn,
      session,
      formatThousand,
    });
    // res.send({ authenticated, user, cart });
  }
  static deleteCart(req, res) {
    const { id } = req.params;
    let { authenticated, user, cart } = req.session;
    cart?.splice(id, 1);
    req.session.cart = cart;
    console.log(cart, 555);
    res.redirect("/cart");
  }
}

module.exports = Controller;
