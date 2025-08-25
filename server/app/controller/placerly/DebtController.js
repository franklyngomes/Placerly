const HttpCode = require("../../helper/HttpCode");
const {DebtModel, DebtSchemaJoi} = require("../../model/placerly/DebtModel");

class DebtController {
  async createDebt(req, res) {
    try {
      const { error } = DebtSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const debt = await DebtModel.create({
        ...req.body,
        userId: req.user._id,
      });

      // Push to user's debts array
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { debts: debt._id },
      });

      return res.status(HttpCode.create).json({
        status: true,
        message: "Debt created successfully",
        data: debt,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }
  async getUserDebts(req, res) {
    try {
      const debts = await DebtModel.find({ userId: req.user._id });
      return res.status(HttpCode.success).json({
        status: true,
        data: debts,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }
  async getDebtById(req, res) {
    try {
      const debt = await DebtModel.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!debt) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Debt not found",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        data: debt,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async updateDebt(req, res) {
    try {
      const { error } = DebtSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const updatedDebt = await DebtModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true }
      );

      if (!updatedDebt) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Debt not found or unauthorized",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        message: "Debt updated successfully",
        data: updatedDebt,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async deleteDebt(req, res) {
    try {
      const debt = await DebtModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!debt) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Debt not found or unauthorized",
        });
      }

      // Remove from user's debts array
      await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { debts: debt._id },
      });

      return res.status(HttpCode.success).json({
        status: true,
        message: "Debt deleted successfully",
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }
}

module.exports = new DebtController()