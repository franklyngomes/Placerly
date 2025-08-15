const HttpCode = require('../helper/HttpCode')
const BannerModel = require('../model/client/BannerModel')
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
  async BannerList(req, res){
    try {
      const banners = await BannerModel.find();
      if(!banners){
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No banners available!"
        })
      }
      return res.render('banner/list', {
        title: "Banner List",
        data: banners
      })
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message
      })
    }
  }
}
module.exports = new AdminController()