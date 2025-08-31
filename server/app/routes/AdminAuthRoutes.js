const express = require("express")
const router = express.Router()
const AdminController = require("../controller/AdminController")

router.post('/signup', AdminController.signup)
router.post('/signin', AdminController.signin)
router.post('/verify-email', AdminController.VerifyEmail)
router.get('/signout', AdminController.signout)
router.post('/forgot-password', AdminController.forgotPassword)
router.post('/reset-password', AdminController.resetPassword)

module.exports = router