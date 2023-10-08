const {
  Service,
  User,
  UserInformation,
  Transaction,
  TransactionItem,
} = require("../models/index");
const formatThousand = require("../helpers/formatThousand");
const { Op } = require("sequelize");
class Controller {
  static showSessionData(req, res) {
    const { authenticated, user, cart, chatLog } = req.session;
    res.send({ authenticated, user, cart, chatLog });
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
        role: "Vendor",
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
      include: [{ model: Service }, { model: UserInformation }],
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
    res.redirect("/cart");
  }
  static addTransaction(req, res) {
    const { user, cart } = req.session;
    console.log(user, 77);
    const mappedTransaction = cart.map((el) => {
      return {
        status: "Pending confirmation",
        dateOrdered: new Date(),
        CustomerId: user.id,
      };
    });

    Transaction.bulkCreate(mappedTransaction)
      .then((data) => {
        const mappedTransactionItem = data.map((el, index) => {
          return { TransactionId: el.id, ServiceId: cart[index].id };
        });
        return TransactionItem.bulkCreate(mappedTransactionItem);
      })
      .then(() => {
        req.session.cart = [];
        res.redirect("/transactions");
      })
      .catch((err) => {
        res.send(err);
      });
  }
  static showTransactions(req, res) {
    let { user } = req.session;
    const isLoggedIn = req.session.authenticated;
    const session = req.session;
    if (!isLoggedIn) {
      res.send("You must be logged in first");
    }
    if (user.role === "Customer") {
      Transaction.findAll({
        where: {
          CustomerId: user.id,
        },
      }).then((data) => {
        res.render("transactions", {
          transactions: data,
          isLoggedIn,
          session,
          user,
        });
      });
    }
    if (user.role === "Vendor") {
      TransactionItem.findAll({
        include: [
          {
            model: Transaction,
          },
          {
            model: Service,
            where: {
              VendorId: user.id,
            },
          },
        ],
      })
        .then((data) => {
          res.render("transactions", {
            transactions: data,
            isLoggedIn,
            session,
            user,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
  static deleteTransaction(req, res) {
    const { id } = req.params;
    TransactionItem.findAll({
      where: { TransactionId: +id }, // Replace +id with the ID you want to delete
    })
      .then((transactionItems) => {
        transactionItems.forEach((item) => {
          item.destroy();
        });
      })
      .then(() => {
        return Transaction.destroy({ where: { id: +id } });
      })
      .then(() => {
        res.redirect("/transactions");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

module.exports = Controller;
