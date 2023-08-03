

class Controller {

  static showLandingPage(req, res) {
    const isLoggedIn = req.session.authenticated;
    res.render('landing-page', {
      isLoggedIn, 
      session:req.session
    });
  }

}

module.exports = Controller;
