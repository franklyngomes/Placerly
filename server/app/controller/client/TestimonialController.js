const HttpCode = require("../../helper/HttpCode");
const {
  TestimonialModel,
  TestimonialSchemaJoi,
} = require("../../model/client/TestimonialModel");
const fsSync = require("fs");
const fs = require("fs").promises;

class TestimonialController {
  async listTestimonial(req, res) {
    try {
      const testimonial = await TestimonialModel.find();
      if (!testimonial) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No available testimonial",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Testimonial fetched successfully!",
        data: testimonial,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async createTestimonial(req, res) {
    try {
      const { author, designation, comment } = req.body;
      const testimonialData = new TestimonialModel({
        author,
        designation,
        comment,
      });
      if (req.file) {
        testimonialData.image = req.file.path.replace(/\\/g,"/");
      }
      const { error, value } = TestimonialSchemaJoi.validate(testimonialData);
      const data = await value.save();

      return res.status(HttpCode.create).json({
        status: true,
        message: "Testimonial added successfully!",
        data: data,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async testimonialDetails(req, res) {
    try {
      const id = req.params.id;
      const testimonial = await TestimonialModel.findById(id);
      if (!testimonial) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Testimonial not found",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Testimonial fetched successfully!",
        data: testimonial,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updateTestimonial(req, res) {
    try {
      const id = req.params.id;
      const { error, value } = TestimonialSchemaJoi.validate(req.body);
      const updateData = await TestimonialModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!updateData) {
        return res.status(HttpCode.notFound).json({
          message: "Testimonial not found!",
        });
      }
      if (req.file) {
        if (updateData.image) {
          if (fsSync.existsSync(updateData.image)) {
            await fs.unlink(updateData.image);
          }
          updateData.image = req.file.path.replace(/\\/g,"/");
        }
      }
      await updateData.save();
      return res.status(HttpCode.success).json({
        status: true,
        message: "Testimonial updated successfully!",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        message: error.message,
      });
    }
  }
  async deleteTestimonial(req, res) {
    try {
      const deleteTestimonial = await TestimonialModel.findByIdAndDelete(
        req.params.id
      );
      if (!deleteTestimonial) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Testimonial not found!",
        });
      }
      if (deleteTestimonial.image) {
        const imgAbsolutePath = deleteTestimonial.image;
        if (fsSync.existsSync(imgAbsolutePath)) {
          await fs.unlink(imgAbsolutePath);
        }
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Testimonial deleted successfully!",
      });
    } catch (error) {
      res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new TestimonialController();
