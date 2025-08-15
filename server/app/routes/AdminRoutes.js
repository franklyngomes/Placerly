const express = require('express')
const router = express.Router()
const AdminController = require('../controller/AdminController')

router.get('/', AdminController.DashboardPage)
router.get('/banner', AdminController.BannerList)

module.exports = router