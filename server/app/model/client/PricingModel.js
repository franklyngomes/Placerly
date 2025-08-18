const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi  = require('joi')

const PricingSchemaJoi = Joi.object({
  planName: Joi.string().min(5).max(15).required(),
  description: Joi.string().min(8).max(15).required(),
  price: Joi.number().required(),
  features: Joi.array().items(Joi.string()).optional(),
})
const PricingSchema = new Schema(
  {
    planName: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    features:{
      type: [String],
    } 
  },
  { timestamps: true }
);

const PricingModel = mongoose.model('pricing', PricingSchema)
module.exports = {PricingModel, PricingSchemaJoi}