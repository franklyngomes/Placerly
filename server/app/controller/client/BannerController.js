const HttpCode = require("../../helper/HttpCode");
const {
  BannerModel,
  BannerSchemaJoi,
} = require("../../model/client/BannerModel");
const fsSync = require("fs");
const fs = require("fs").promises;

class BannerController {
  async listBanner(req, res) {
    try {
      const banners = await BannerModel.find();
      if (!banners) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No available banners",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Banners fetched successfully!",
        data: banners,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async listActiveBanner(req, res){
    try {
      const banners = await BannerModel.findOne({status: true});
      if (!banners) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No active banners",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Banners fetched successfully!",
        data: banners,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async createBanner(req, res) {
    try {
      const { title, subtitle, description } = req.body;
      const bannerData = new BannerModel({
        title,
        subtitle,
        description,
      });
      if (req.files && req.files.primaryImage) {
        bannerData.primaryImage = req.files.primaryImage[0].path.replace(/\\/g,"/")
      }
      if (req.files && req.files.secondaryImage) {
        bannerData.secondaryImage = req.files.secondaryImage[0].path.replace(/\\/g,"/");
      }
      const { error, value } = BannerSchemaJoi.validate(bannerData);
      const data = await value.save();

      return res.status(HttpCode.create).json({
        status: true,
        message: "Banner added successfully!",
        data: data,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async bannerDetails(req, res) {
    try {
      const id = req.params.id;
      const banner = await BannerModel.findById(id);
      if (!banner) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Banner not found",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Banner fetched successfully!",
        data: banner,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updateBanner(req, res) {
    try {
      const id = req.params.id;
      let payload = { ...req.body };
      // Converting string "true"/"false" to real boolean
      if (payload.status === "true") payload.status = true;
      if (payload.status === "false") payload.status = false;
      const { error, value } = BannerSchemaJoi.validate(payload);
      if (value.status === true) {
        const checkActiveBanner = await BannerModel.findOne({
          status: true,
          _id: { $ne: id },
        });
        if (checkActiveBanner) {
          return res.status(HttpCode.badRequest).json({
            status: false,
            message: "You cannot have more than one active banners",
          });
        }
      }
      const updateData = await BannerModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updateData) {
        return res.status(HttpCode.notFound).json({
          message: "Banner not found!",
        });
      }
      if (req.files && req.files.primaryImage && req.files.secondaryImage) {
        if (updateData.primaryImage || updateData.secondaryImage) {
          if (
            fsSync.existsSync(updateData.primaryImage) ||
            fsSync.existsSync(updateData.secondaryImage)
          ) {
            await fs.unlink(updateData.primaryImage);
            await fs.unlink(updateData.secondaryImage);
          }
          updateData.primaryImage = req.files.primaryImage[0].path.replace(/\\/g,"/");
          updateData.secondaryImage = req.files.secondaryImage[0].path.replace(/\\/g,"/");
        }
      }

      await updateData.save();
      return res.status(HttpCode.success).json({
        status: true,
        message: "Banner updated successfully!",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        message: error.message,
      });
    }
  }
  async deleteBanner(req, res) {
    try {
      const deletedBanner = await BannerModel.findByIdAndDelete(req.params.id);
      if (!deletedBanner) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Banner not found!",
        });
      }
      if (deletedBanner.primaryImage && deletedBanner.secondaryImage) {
        const primaryImgAbsolutePath = deletedBanner.primaryImage;
        const secondaryImgAbsolutePath = deletedBanner.secondaryImage;

        if (
          fsSync.existsSync(primaryImgAbsolutePath) &&
          fsSync.existsSync(secondaryImgAbsolutePath)
        ) {
          await fs.unlink(primaryImgAbsolutePath);
          await fs.unlink(secondaryImgAbsolutePath);
        }
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Banner deleted successfully!",
      });
    } catch (error) {
      res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new BannerController();
