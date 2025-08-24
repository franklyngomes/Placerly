const {
  AssetsModel,
  AssetsSchemaJoi,
} = require("../../model/placerly/AssetsModel");
const HttpCode = require("../../helper/HttpCode");

class AssetsController {
  async ListAssets(req, res) {
    try {
      const response = await AssetsModel.find();
      if (!response) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No assets found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Assets fetched successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async CreateAssets(req, res) {
    try {
      const { error, value } = AssetsSchemaJoi.validate(req.body);
      const newAsset = new AssetsModel({ value });
      const data = newAsset.save();
      return res.status(HttpCode.success).json({
        status: true,
        message: "Assets created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async AssetsDetails(req, res) {
    try {
      const id = req.params.id
      const response = await AssetsModel.findById(id);
      if (!response) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No assets found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Asset fetched successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async AssetsUpdate(req, res) {
    try {
      const id = req.params.id
      const {error, value} = AssetsSchemaJoi.validate(req.body)
      const response = await AssetsModel.findByIdAndUpdate(id, value);
      return res.status(HttpCode.success).json({
        status: true,
        message: "Asset updated successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async AssetsDelete(req, res) {
    try {
      const id = req.params.id
      const response = await AssetsModel.findByIdAndDelete(id);
      return res.status(HttpCode.success).json({
        status: true,
        message: "Asset deleted successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AssetsController();
