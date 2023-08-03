const router = require("express").Router();
const Controller = require("../controllers/controller");
const SessionController = require("../controllers/session");

router.get("/", Controller.showLandingPage);

router.get("/vendors", (req, res) => res.redirect("/"));
router.get("/cakes", Controller.showCakes);

// Session edit user details
router.get("/editUserDetails", SessionController.showFormEditDetails);
router.post("/editUserDetails", SessionController.editUser);

// Session log-in & log-out
router.get("/login", SessionController.showLoginFormCustomer);
router.post("/login", SessionController.loginCustomer);
router.get("/login/vendors", SessionController.showLoginFormVendor);
router.post("/login/vendors", SessionController.loginVendor);
router.get("/signup", SessionController.showSignupForm);
router.post("/signup", SessionController.addUser);
router.get("/logout", SessionController.logout);

module.exports = router;
