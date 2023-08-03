const router = require("express").Router();

const Controller = require("../controllers/controller");
const SessionController = require("../controllers/session");
const ChatroomController = require("../controllers/chatroom");

router.get("/", Controller.showLandingPage);

router.get("/session-data", Controller.showSessionData);

router.get("/vendors", Controller.showVendors);
router.get("/vendors/:id", Controller.showVendorById);
router.get("/cakes", Controller.showCakes);
router.get("/cakes/:id", Controller.addCakeToCart);
router.get("/cart", Controller.cart);
router.get("/deleteCart/:id", Controller.deleteCart);

router.get("/chatroom/:id", ChatroomController.goToChatroom);

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
