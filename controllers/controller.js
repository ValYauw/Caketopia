const { Service, User } = require("../models/index");
class Controller {
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
}

module.exports = Controller;
