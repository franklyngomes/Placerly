const HttpCode = require("../../helper/HttpCode");
const {
  UtilityModel,
  UtilitySchemaJoi,
} = require("../../model/placerly/UtilityModel");
const {UserModel} = require("../../model/placerly/UserModel")

class UtilityController {
  async createUtility(req, res) {
    try {
      const { error } = UtilitySchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const utility = await UtilityModel.create({
        ...req.body,
        userId: req.user._id,
      });

      // Push to user's utilities array
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { utility: utility._id },
      });

      return res.status(HttpCode.create).json({
        status: true,
        message: "Utility created successfully",
        data: utility,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getUserUtilities(req, res) {
    try {
      const utilities = await UtilityModel.find({ userId: req.user._id });
      return res.status(HttpCode.success).json({
        status: true,
        data: utilities,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getUtilityById(req, res) {
    try {
      const utility = await UtilityModel.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!utility) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Utility not found",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        data: utility,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async updateUtility(req, res) {
    try {
      const { error } = UtilitySchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const updatedUtility = await UtilityModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true }
      );

      if (!updatedUtility) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Utility not found or unauthorized",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        message: "Utility updated successfully",
        data: updatedUtility,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async deleteUtility(req, res) {
    try {
      const utility = await UtilityModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!utility) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Utility not found or unauthorized",
        });
      }

      // Remove from user's utilities array
      await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { utilities: utility._id },
      });

      return res.status(HttpCode.success).json({
        status: true,
        message: "Utility deleted successfully",
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }
}
module.exports = new UtilityController();
