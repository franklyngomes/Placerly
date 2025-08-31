const HttpCode = require("../helper/HttpCode");
const { BannerModel } = require("../model/client/BannerModel");
const { AboutModel } = require("../model/client/AboutModel");
const { ServiceModel } = require("../model/client/ServiceModel");
const { TestimonialModel } = require("../model/client/TestimonialModel");
const { PricingModel } = require("../model/client/PricingModel");

class AdminController {
  async DashboardPage(req, res) {
    try {
      const banners = await BannerModel.find();
      const about = await AboutModel.find();
      const service = await ServiceModel.find();
      const testimonial = await TestimonialModel.find();
      return res.render("dashboard", {
        title: "Admin Dashboard",
        banners,
        about,
        service,
        testimonial,
        user: req.user
      });
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
        user: req.user
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
        user: req.user
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
        user: req.user
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
        user: req.user
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
        user: req.user
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
      return res.render("faq/list", {
        title: "FAQ List",
        user: req.user
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async SigninPage(req, res) {
    try {
      return res.render("signin", {
        title: "Signin",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async VerifyEmailPage(req, res) {
    try {
      return res.render("verify-email", {
        title: "Verify Email",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async SignupPage(req, res) {
    try {
      return res.render("signup", {
        title: "Signup",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async ForgotPasswordPage(req, res) {
    try {
      return res.render("forgot-password", {
        title: "Forgot Password",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
   async ResetPasswordPage(req, res) {
    try {
      return res.render("reset-password", {
        title: "Reset Password",
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
