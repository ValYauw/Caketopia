const { Service, User } = require("../models/index");
class Controller {

  static showSessionData(req, res) {
    const {authenticated, user, cart} = req.session;
    res.send({authenticated, user, cart});
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
        Service.findAll({
            include: { model: User },
        })
            .then((data) => {
                console.log(data);
                res.render("cakes", { cakes: data, isLoggedIn, session });
            })
            .catch((err) => {
                res.send(err);
            });
    }
  static addCakeToCart(req, res) {
    const {id} = req.params;
    if (req.session.authenticated) {
      const session = req.session;
      if (!session.cart) session.cart = [];
      Service.findByPk(+id, {where: {isActive: true}})
        .then((service) => {
          if (service) session.cart.push(service);
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        })
    }
  }

}

module.exports = Controller;
