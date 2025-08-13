const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PricingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features:{
      type: [String],
      required: true,
    } 
  },
  { timestamps: true }
);

const PricingModel = mongoose.model('pricing', PricingSchema)
module.exports = PricingModel