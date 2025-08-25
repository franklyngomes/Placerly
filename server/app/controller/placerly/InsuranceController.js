const {
  InsuranceModel,
  InsuranceSchemaJoi,
} = require("../../model/placerly/InsuranceModel");
const HttpCode = require("../../helper/HttpCode");
const {UserModel} = require("../../model/placerly/UserModel")

class InsuranceController {
  async createInsurance(req, res) {
    try {
      const { error } = InsuranceSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const insurance = await InsuranceModel.create({
        ...req.body,
        userId: req.user._id,
      });

      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { insurance: insurance._id },
      });

      return res.status(HttpCode.create).json({
        status: true,
        message: "Insurance created successfully",
        data: insurance,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getUserInsurances(req, res) {
    try {
      const insurances = await InsuranceModel.find({ userId: req.user._id });
      return res.status(HttpCode.success).json({
        status: true,
        data: insurances,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getInsuranceById(req, res) {
    try {
      const insurance = await InsuranceModel.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!insurance) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Insurance not found",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        data: insurance,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async updateInsurance(req, res) {
    try {
      const { error } = InsuranceSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const updatedInsurance = await InsuranceModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true }
      );

      if (!updatedInsurance) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Insurance not found or unauthorized",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        message: "Insurance updated successfully",
        data: updatedInsurance,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async deleteInsurance(req, res) {
    try {
      const insurance = await InsuranceModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!insurance) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Insurance not found or unauthorized",
        });
      }

      // Remove from user's insurances array
      await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { insurances: insurance._id },
      });

      return res.status(HttpCode.success).json({
        status: true,
        message: "Insurance deleted successfully",
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new InsuranceController()