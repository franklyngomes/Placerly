const express = require('express')
const router = express.Router()
const AdminController = require('../controller/AdminController')

router.get('/dashboard', AdminController.DashboardPage)

module.exports = router