const express = require('express')
const router = express.Router()
const UserController = require("../controller/placerly/UserController");
const { AuthCheck } = require('../middleware/Auth');

router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);
router.post('/verify-email',UserController.verifyEmail)
router.post('/forgot-password',UserController.forgotPassword)
router.post('/reset-password',UserController.resetPassword)
router.get('/profile',AuthCheck ,UserController.userProfileDetails)

module.exports = router