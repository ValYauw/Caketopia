const router = require('express').Router();
const Controller = require("../controllers/controller");

router.get('/login', Controller.showLoginFormCustomer);
router.post('/login', Controller.loginCustomer);
router.get('/login/vendors', Controller.showLoginFormVendor);
router.post('/login/vendors', Controller.loginVendor);
router.get('/signup', Controller.showSignupForm);
router.post('/signup', Controller.addUser);
router.get('/logout', Controller.logout);

module.exports = router;