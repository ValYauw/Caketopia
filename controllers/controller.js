const {User, UserInformation} = require("../models/index");
const {Op} = require('sequelize');

class Controller {

  static showLoginFormCustomer(req, res) {
    if (req.session.authenticated) {
      res.redirect('/');
    } else {
      res.render('login', {roles:'Customer', url:'/login'});
    }
  }

  static showLoginFormVendor(req, res) {
    if (req.session.authenticated) {
      res.redirect('/');
    } else {
      res.render('login', {roles:'Vendor', url:'/login/vendors'});
    }
  }

  static showSignupForm(req, res) {
    if (req.session.authenticated) {
      res.redirect('/');
    } else {
      res.render('signup');
    }
  }

  static createLoginSession(user, req) {
    req.session.authenticated = true;
    const {id, name, email, roles} = user;
    req.session.user = {id, name, email, roles};
    console.log("A user has logged in");
    console.log(req.session);
  }

  static loginCustomer(req, res) {
    const {name, password} = req.body;
    User.findOne({where: {
      [Op.and]:[
        {name}, 
        {roles:"Customer"}
      ]
    }})
      .then(user => {
        if (user.password === password) {
          Controller.createLoginSession(user, req);
        }
      })
      .then(() => res.redirect('/cakes'))
      .catch(err => {
        console.log(err);
        res.send(err);
      })
  }

  static loginVendor(req, res) {
    const {name, password} = req.body;
    User.findOne({where: {
      [Op.and]:[
        {name}, 
        {roles:"Vendor"}
      ]
    }})
      .then(user => {
        if (user.password === password) {
          Controller.createLoginSession(user, req);
        }
        return user;
      })
      .then((user) => res.redirect(`/vendors/${user.id}`))
      .catch(err => {
        console.log(err);
        res.send(err);
      })
  }

  static addUser(req, res) {
    const {name, email, roles, phoneNumber, address, password} = req.body;
    let UserId;
    User.create({name, email, password, roles})
      .then(user => {
        UserId = user.id;
        Controller.createLoginSession(user, req);
        return UserInformation.create({UserId, phoneNumber, address});
      })
      .then (() => res.redirect('/'))
      .catch(err => {
        console.log(err);
        res.send(err);
      })
  }

  static logout(req, res) {
    if (req.session.authenticated) {
      req.session.destroy((error) => {
        console.log(error ? error : "A user has logged out");
      })
    }
    res.redirect('/');
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
