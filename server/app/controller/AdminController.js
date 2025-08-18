const HttpCode = require("../helper/HttpCode");
const { BannerModel } = require("../model/client/BannerModel");
const { AboutModel } = require("../model/client/AboutModel");
const { ServiceModel } = require("../model/client/ServiceModel");
const { TestimonialModel } = require("../model/client/TestimonialModel");
const { PricingModel } = require("../model/client/PricingModel");

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
  async ServiceListPage(req, res) {
    try {
      await ServiceModel.find();
      return res.render("service/list", {
        title: "Service List",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async TestimonialListPage(req, res) {
    try {
      await TestimonialModel.find();
      return res.render("testimonial/list", {
        title: "Testimonial List",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async PricingListPage(req, res) {
    try {
      await PricingModel.find();
      return res.render("pricing/list", {
        title: "Pricing List",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async FaqListPage(req, res) {
    try {
      await PricingModel.find();
      return res.render("faq/list", {
        title: "FAQ List",
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
