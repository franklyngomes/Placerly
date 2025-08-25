const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const TypeOptions = {
  ENERGY: "Energy",
  WATER: "Water",
};

const UtilitySchemaJoi = Joi.object({
  userId: Joi.string().required("User is required!"),
  type: Joi.string().valid(...Object.values(TypeOptions)).required("Type is required"),
  provider: Joi.string().required("Provider is required"),
  accountNumber: Joi.string().required("Account Number is required"),
  billingCycle: Joi.string(),
  outstandingBill: Joi.number(),
});

const UtilitySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    type: {
      type: String,
    },
    provider: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    billingCycle: {
      type: String,
    },
    outstandingBill: {
      type: Number,
    },
  },
  { timestamps: true }
);
const UtilityModel = mongoose.model("utility", UtilitySchema);
module.exports = { UtilityModel, UtilitySchemaJoi };