const router = require("express").Router();
const authController = require("../controllers/authController");
const loginLimiter = require("../middleware/loginLimiter");

router.post("/auth", loginLimiter, authController.login);

router.get('/refresh', authController.refresh);

router.post('/logout', authController.logout);


module.exports = router;
