const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require('joi')

const TestimonialSchemaJoi = Joi.object({
  author: Joi.string().min(3).max(20).required(),
  designation: Joi.string().min(8).max(20).required(),
  comment: Joi.string().min(20).max(40).required(),
  image: Joi.string().optional(),
})

const TestimonialSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const TestimonialModel = mongoose.model('testimonial', TestimonialSchema)
module.exports = {TestimonialModel,TestimonialSchemaJoi}