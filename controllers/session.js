const { User, UserInformation } = require("../models/index");
const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/password");

class SessionController {
  static showLoginFormCustomer(req, res) {
    if (req.session.authenticated) {
      return res.redirect("/");
    }
    const { error } = req.query;
    res.render("login", {
      role: "Customer",
      error,
    });
  }

  static showLoginFormVendor(req, res) {
    if (req.session.authenticated) {
      return res.redirect("/");
    }
    const { error } = req.query;
    res.render("login", {
      role: "Vendor",
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
    const {id, name, role} = user;
    req.session.user = {id, name, role};
    req.session.chatLog = [];
    console.log("A user has logged in");
    console.log(req.session);
  }

  static loginCustomer(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        [Op.and]: [{ email }, { role: "Customer" }],
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
    const { email, password } = req.body;
    User.findOne({
      where: {
        [Op.and]: [{ email }, { role: "Vendor" }],
      },
    })
      .then((user) => {
        if (!user) {
          return res.redirect("/login/vendors?error=User%20is%20not%20found");
        }
        if (!comparePassword(password, user.password)) {
          return res.redirect("/login/vendors?error=Password%20is%20wrong");
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
    const { name, email, role, phoneNumber, address, password } = req.body;
    let UserId;
    User.create({ name, email, password, role })
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

    const { email, role, phoneNumber, address, password } = req.body;
    let UserId = req.session.user.id;
    User.update(
      { email, password, role },
      {
        where: { id: UserId },
        individualHooks: true
      }
    )
      .then(() => User.findOne({where: { id: UserId }}))
      .then((user) => {
        UserInformation.update(
          { phoneNumber, address },
          {
            where: { UserId },
          }
        );
        const { id, name, role } = user;
        console.log(id, name, role);
        req.session.user = { id, name, role };
        // SessionController.createLoginSession(user, req)
      })
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
