const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const AboutSchemaJoi = Joi.object({
  title: Joi.string().min(15).max(30).required(),
  descriptionOne: Joi.string().min(20).max(40).required(),
  descriptionTwo: Joi.string().min(20).max(40).required(),
  mission: Joi.string().min(10).max(20).required(),
  image: Joi.string().optional(),
  values: Joi.array().items(Joi.string()).optional(),
  status: Joi.boolean().optional()
})
const AboutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptionOne: {
      type: String,
      required: true,
    },
    descriptionTwo: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    values: {
      type: [String],
      required: true,
    },
    image: {
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

const AboutModel = mongoose.model("about", AboutSchema);
module.exports = {AboutModel, AboutSchemaJoi};
