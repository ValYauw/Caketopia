

class Controller {

  static showLandingPage(req, res) {
    const isLoggedIn = req.session.authenticated;
    res.render('landing-page', {
      isLoggedIn, 
      session:req.session
    });
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
