const HttpCode = require('../helper/HttpCode')
class AdminController {
  async DashboardPage(req, res){
    try {
      return res.render('dashboard')
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message
      })
    }
  }
}
module.exports = new AdminController()