const router = require('express').Router();
const Controller = require("../controllers/controller");

router.get('/login', Controller.showLoginForm);
router.post('/login', Controller.createLoginSession);
router.get('/signup', Controller.showSignupForm);
router.post('/signup', Controller.addUser);

module.exports = router;