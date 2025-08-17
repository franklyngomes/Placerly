const HttpCode = require("../../helper/HttpCode");
const { AboutModel, AboutSchemaJoi } = require("../../model/client/AboutModel");
const fsSync = require("fs");
const fs = require("fs").promises;

class AboutController {
  async listAbout(req, res) {
    try {
      const about = await AboutModel.find();
      if (!about) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No available about documents",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "About documents fetched successfully!",
        data: about,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async createAbout(req, res) {
    try {
      const { title, descriptionOne, descriptionTwo, mission, values } =
        req.body;
      const aboutData = new AboutModel({
        title,
        descriptionOne,
        descriptionTwo,
        mission,
        values,
      });
      if (req.file) {
        aboutData.image = req.file.path;
      }
      const { error, value } = AboutSchemaJoi.validate(aboutData);
      const data = await value.save();

      return res.status(HttpCode.create).json({
        status: true,
        message: "About added successfully!",
        data: data,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async aboutDetails(req, res) {
    try {
      const id = req.params.id;
      const about = await AboutModel.findById(id);
      if (!about) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "About not found",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "About fetched successfully!",
        data: about,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updateAbout(req, res) {
    try {
      const id = req.params.id;
      let payload = { ...req.body };
      // Converting string "true"/"false" to real boolean
      if (payload.status === "true") payload.status = true;
      if (payload.status === "false") payload.status = false;
      const { error, value } = AboutSchemaJoi.validate(payload);
      if (value.status === true) {
        const checkActiveAbout = await AboutModel.findOne({
          status: true,
          _id: { $ne: id },
        });
        if (checkActiveAbout) {
          return res.status(HttpCode.badRequest).json({
            status: false,
            message: "You cannot have more than one active abouts",
          });
        }
      }
      const updateData = await AboutModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updateData) {
        return res.status(HttpCode.notFound).json({
          message: "About not found!",
        });
      }
      if (req.files && req.files.image) {
        if (updateData.image) {
          if (fsSync.existsSync(updateData.image)) {
            await fs.unlink(updateData.image);
          }
          updateData.image = req.files.image[0].path;
        }
      }
      await updateData.save();
      return res.status(HttpCode.success).json({
        status: true,
        message: "About updated successfully!",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        message: error.message,
      });
    }
  }
  async deleteAbout(req, res) {
    try {
      const deletedAbout = await AboutModel.findByIdAndDelete(req.params.id);
      if (!deletedAbout) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "About not found!",
        });
      }
      if (deletedAbout.image) {
        const imgAbsolutePath = deletedAbout.image;
        if (fsSync.existsSync(imgAbsolutePath)) {
          await fs.unlink(imgAbsolutePath);
        }
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "About deleted successfully!",
      });
    } catch (error) {
      res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AboutController();
