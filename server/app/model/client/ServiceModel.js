const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const ServiceSchemaJoi = Joi.object({
  title: Joi.string().min(15).max(30).required(),
  description: Joi.string().min(20).max(40).required(),
  url:Joi.string().required(),
  image: Joi.string().optional(),
});

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const ServiceModel = mongoose.model("service", ServiceSchema);
module.exports = { ServiceModel, ServiceSchemaJoi };
