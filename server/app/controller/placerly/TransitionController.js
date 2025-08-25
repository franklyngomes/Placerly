const HttpCode = require("../../helper/HttpCode");
const {} = require("../../model/placerly/TransitionModel");

class TransitionController {
  async createTransition(req, res) {
    try {
      const { error } = TransitionSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const transition = await TransitionModel.create({
        ...req.body,
        userId: req.user._id,
      });

      // Link to user (if you want to track transitions in user model)
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { transitions: transition._id },
      });

      return res.status(HttpCode.create).json({
        status: true,
        message: "Transition record created successfully",
        data: transition,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getUserTransitions(req, res) {
    try {
      const transitions = await TransitionModel.find({ userId: req.user._id });
      return res.status(HttpCode.success).json({
        status: true,
        data: transitions,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async getTransitionById(req, res) {
    try {
      const transition = await TransitionModel.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!transition) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Transition not found",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        data: transition,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async updateTransition(req, res) {
    try {
      const { error } = TransitionSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.details[0].message,
        });
      }

      const updatedTransition = await TransitionModel.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        req.body,
        { new: true }
      );

      if (!updatedTransition) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Transition not found or unauthorized",
        });
      }

      return res.status(HttpCode.success).json({
        status: true,
        message: "Transition updated successfully",
        data: updatedTransition,
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }

  async deleteTransition(req, res) {
    try {
      const transition = await TransitionModel.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });

      if (!transition) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Transition not found or unauthorized",
        });
      }

      // Remove from user's transitions array
      await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { transitions: transition._id },
      });

      return res.status(HttpCode.success).json({
        status: true,
        message: "Transition deleted successfully",
      });
    } catch (err) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: err.message,
      });
    }
  }
}
module.exports = new TransitionController()
