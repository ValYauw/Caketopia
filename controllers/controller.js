// const Model = require("../models/model");

class Controller {

  static showLoginForm(req, res) {
    res.render('login');
  }

  static showSignupForm(req, res) {
    res.render('signup');
  }

  static createLoginSession(req, res) {
    const {username, password} = req.body;
    res.send({username, password});
  }

  static addUser(req, res) {
    const {username, password, name, email, roles} = req.body;
    res.send({username, password, name, email, roles});
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

module.exports = Controller;
