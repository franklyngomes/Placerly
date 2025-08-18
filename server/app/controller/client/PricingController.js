const HttpCode = require("../../helper/HttpCode");
const {PricingModel, PricingSchemaJoi} = require("../../model/client/PricingModel")
const fsSync = require("fs");
const fs = require("fs").promises;

class PricingController {
  async listPricing(req, res) {
    try {
      const pricing = await PricingModel.find();
      if (!pricing) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No available pricing plan",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Pricing plans fetched successfully!",
        data: pricing,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async createPricing(req, res) {
    try {
      const {planName, description, price, features} = req.body;
      const pricingData = new PricingModel({
        planName, description, price, features
      });
      const { error, value } = PricingSchemaJoi.validate(pricingData);
      const data = await value.save();

      return res.status(HttpCode.create).json({
        status: true,
        message: "Pricing plan added successfully!",
        data: data,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async pricingDetails(req, res) {
    try {
      const id = req.params.id;
      const pricing = await PricingModel.findById(id);
      if (!pricing) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Pricing plan not found",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Pricing plan fetched successfully!",
        data: pricing,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updatePricing(req, res) {
    try {
      const id = req.params.id;
      const { error, value } = PricingSchemaJoi.validate(req.body);
      const updateData = await PricingModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updateData) {
        return res.status(HttpCode.notFound).json({
          message: "Pricing plan not found!",
        });
      }
      await updateData.save();
      return res.status(HttpCode.success).json({
        status: true,
        message: "Pricing plan updated successfully!",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        message: error.message,
      });
    }
  }
  async deletePricing(req, res) {
    try {
      const deletePlan = await PricingModel.findByIdAndDelete(req.params.id);
      if (!deletePlan) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Pricing plan found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Pricing plan deleted successfully!",
      });
    } catch (error) {
      res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new PricingController();
