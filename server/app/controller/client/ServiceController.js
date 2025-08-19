const HttpCode = require("../../helper/HttpCode");
const {ServiceModel, ServiceSchemaJoi} = require("../../model/client/ServiceModel")
const fsSync = require("fs");
const fs = require("fs").promises;

class ServiceController {
  async listService(req, res) {
    try {
      const service = await ServiceModel.find();
      if (!service) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "No available service",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Service documents fetched successfully!",
        data: service,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async createService(req, res) {
    try {
      const { title, description, url} = req.body;
      const serviceData = new ServiceModel({
        title, description, url
      });
      if (req.file) {
        serviceData.image = req.file.path.replace(/\\/g, "/");
      }
      const { error, value } = ServiceSchemaJoi.validate(serviceData);
      const data = await value.save();

      return res.status(HttpCode.create).json({
        status: true,
        message: "Service added successfully!",
        data: data,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async serviceDetails(req, res) {
    try {
      const id = req.params.id;
      const service = await ServiceModel.findById(id);
      if (!service) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Service not found",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Service fetched successfully!",
        data: service,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async updateService(req, res) {
    try {
      const id = req.params.id;
      const { error, value } = ServiceSchemaJoi.validate(req.body);
      const service = await ServiceModel.findById(id);
      if (!service) {
        return res.status(HttpCode.notFound).json({
          message: "Service not found!",
        });
      }
      Object.assign(service, value)
      if (req.file) {
        if (service.image) {
          if (fsSync.existsSync(service.image)) {
            await fs.unlink(service.image);
          }
        }
        service.image = req.file.path.replace(/\\/g, "/");
      }
      await service.save();
      return res.status(HttpCode.success).json({
        status: true,
        message: "Service updated successfully!",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        message: error.message,
      });
    }
  }
  async deleteService(req, res) {
    try {
      const deleteService = await ServiceModel.findByIdAndDelete(req.params.id);
      if (!deleteService) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Service not found!",
        });
      }
      if (deleteService.image) {
        const imgAbsolutePath = deleteService.image;
        if (fsSync.existsSync(imgAbsolutePath)) {
          await fs.unlink(imgAbsolutePath);
        }
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Service deleted successfully!",
      });
    } catch (error) {
      res.status(HttpCode.serverError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new ServiceController();
