const HttpCode = require("../helper/HttpCode");
const BannerModel = require("../model/client/BannerModel");
class AdminController {
  async DashboardPage(req, res) {
    try {
      return res.render("dashboard");
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async BannerListPage(req, res) {
    try {
      const banners = await BannerModel.find();
      return res.render("banner/list", {
        title: "Banner List",
        // data: banners,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
    //get single data
  async editPage(req, res) {
    try {
      const banner = await BannerModel.findById(req.params.id);
      console.log(banner);
      res.render("banner/edit", {
        title: "Edit Page",
        data: banner,
        username: req.user.name,
      });
    } catch (error) {
      res.redirect("/banner/list", {
        message: error.message,
      });
    }
  }
}
module.exports = new AdminController();
