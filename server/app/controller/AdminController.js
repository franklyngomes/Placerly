const HttpCode = require("../helper/HttpCode");
const {BannerModel} = require("../model/client/BannerModel");
const {AboutModel} = require("../model/client/AboutModel")
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
      await BannerModel.find();
      return res.render("banner/list", {
        title: "Banner List",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async AboutListPage(req, res) {
    try {
      await AboutModel.find();
      return res.render("about/list", {
        title: "About List",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AdminController();
