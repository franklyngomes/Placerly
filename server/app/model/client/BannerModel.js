const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi')

const BannerSchemaJoi = Joi.object({
  title: Joi.string().min(15).max(30).required(),
  subtitle: Joi.string().min(8).max(20).required(),
  description: Joi.string().min(20).max(40).required(),
  primaryImage: Joi.string().optional(),
  secondaryImage:Joi.string().optional(),
  status: Joi.boolean().optional()
})

const BannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    primaryImage: {
      type: String,
      required: true,
    },
    secondaryImage: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const BannerModel = mongoose.model('banner', BannerSchema)
module.exports = {BannerModel,BannerSchemaJoi}