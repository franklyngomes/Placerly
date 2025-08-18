const HttpCode = require("../../helper/HttpCode");
const {FaQModel, FaqSchemaJoi} = require("../../model/client/FaQModel")
const fsSync = require("fs");
const fs = require("fs").promises;

class FaqController {
  async listFaq(req, res) {
    try {
      const faq = await FaQModel.find();
      if (!faq) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No available faq",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Faq fetched successfully!",
        data: faq,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async createFaq(req, res) {
    try {
      const { question, answer } = req.body;
      const faqData = new FaQModel({
      question, answer
      });
      const { error, value } = FaqSchemaJoi.validate(faqData);
      const data = await value.save();

      return res.status(HttpCode.create).json({
        status: true,
        message: "Faq added successfully!",
        data: data,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async faqDetails(req, res) {
    try {
      const id = req.params.id;
      const faq = await FaQModel.findById(id);
      if (!faq) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Faq not found",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Faq fetched successfully!",
        data: faq,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updateFaq(req, res) {
    try {
      const id = req.params.id;
      const { error, value } = FaqSchemaJoi.validate(req.body);
      const updateData = await FaQModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updateData) {
        return res.status(HttpCode.notFound).json({
          message: "Faq not found!",
        });
      }
      await updateData.save();
      return res.status(HttpCode.success).json({
        status: true,
        message: "Faq updated successfully!",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        message: error.message,
      });
    }
  }
  async deleteFaq(req, res) {
    try {
      const deletedFaq = await FaQModel.findByIdAndDelete(req.params.id);
      if (!deletedFaq) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Faq not found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Faq deleted successfully!",
      });
    } catch (error) {
      res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new FaqController();
