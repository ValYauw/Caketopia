const { User, UserInformation, Service, Vendor } = require("../models/index");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/password");

class SessionController {
    static showLoginFormCustomer(req, res) {
        if (req.session.authenticated) {
            return res.redirect("/");
        }
        const { error } = req.query;
        res.render("login", {
            roles: "Customer",
            error,
        });
    }

    static showLoginFormVendor(req, res) {
        if (req.session.authenticated) {
            return res.redirect("/");
        }
        const { error } = req.query;
        res.render("login", {
            roles: "Vendor",
            error,
        });
    }

    static showSignupForm(req, res) {
        if (req.session.authenticated) {
            return res.redirect("/");
        }
        const { error } = req.query;
        res.render("signup", {
            isLoggedIn: false,
            error,
        });
    }

    static showFormEditDetails(req, res) {
        const isLoggedIn = req.session.authenticated;
        if (!isLoggedIn) {
            return res.redirect("/");
        }

        const { error } = req.query;
        const session = req.session;
        const { id } = session.user;
        UserInformation.findOne({ where: { UserId: id }, include: User })
            .then((user) => {
                const { phoneNumber, address, User } = user;
                const { name, email } = User;
                res.render("editDetails", {
                    isLoggedIn,
                    session,
                    name,
                    email,
                    phoneNumber,
                    address,
                    error,
                });
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    }

    static createLoginSession(user, req) {
        req.session.authenticated = true;
        const { id, name, roles } = user;
        req.session.user = { id, name, roles };
        console.log("A user has logged in");
        console.log(req.session);
    }

    static loginCustomer(req, res) {
        const { name, password } = req.body;
        User.findOne({
            where: {
                [Op.and]: [{ name }, { roles: "Customer" }],
            },
        })
            .then((user) => {
                if (!user) {
                    return res.redirect("/login?error=User%20is%20not%20found");
                }
                if (!comparePassword(password, user.password)) {
                    return res.redirect("/login?error=Password%20is%20wrong");
                }
                SessionController.createLoginSession(user, req);
                res.redirect("/cakes");
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    }

    static loginVendor(req, res) {
        const { name, password } = req.body;
        User.findOne({
            where: {
                [Op.and]: [{ name }, { roles: "Vendor" }],
            },
        })
            .then((user) => {
                if (!user) {
                    return res.redirect(
                        "/login/vendors?error=User%20is%20not%20found"
                    );
                }
                if (!comparePassword(password, user.password)) {
                    return res.redirect(
                        "/login/vendors?error=Password%20is%20wrong"
                    );
                }
                SessionController.createLoginSession(user, req);
                res.redirect(`/vendors/${user.id}`);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    }

    static addUser(req, res) {
        const { name, email, roles, phoneNumber, address, password } = req.body;
        let UserId;
        User.create({ name, email, password, roles })
            .then((user) => {
                UserId = user.id;
                UserInformation.create({ UserId, phoneNumber, address });
                return user;
            })
            .then((user) => SessionController.createLoginSession(user, req))
            .then(() => res.redirect("/"))
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => el.message);
                    res.redirect(`/signup?error=${errors.join(",")}`);
                    return;
                }
                console.log(err);
                res.send(err);
            });
    }

    static editUser(req, res) {
        if (!req.session.authenticated) {
            return res.redirect("/");
        }

        const { email, roles, phoneNumber, address, password } = req.body;
        let UserId;
        User.create({ email, password, roles })
            .then((user) => {
                UserId = user.id;
                UserInformation.create({ UserId, phoneNumber, address });
            })
            .then((user) => SessionController.createLoginSession(user, req))
            .then(() => res.redirect("/"))
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => el.message);
                    res.redirect(`/signup?error=${errors.join(",")}`);
                    return;
                }
                console.log(err);
                res.send(err);
            });
    }

    static logout(req, res) {
        if (req.session.authenticated) {
            req.session.destroy((error) => {
                console.log(error ? error : "A user has logged out");
            });
        }
        res.redirect("/");
    }

    // static command(req, res) {
    //   const {urlparams} = req.params;
    //   const {posted} = req.body;
    //   const {queries} = req.query;
    //   Model.command(args, (err, data) => {
    //     if (err) { return res.send(err); }
    //     res.render('')
    //   })
    // }
}

module.exports = SessionController;
