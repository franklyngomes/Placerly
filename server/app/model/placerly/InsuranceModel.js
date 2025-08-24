const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const TypeOptions = {
  LIFE: "Life Insurance",
  HOME: "Home Insurance",
  CAR: "Car Insurance",
  HEALTH: "Health Insurance"
};

const InsuranceSchemaJoi = Joi.object({
  userId: Joi.string().required("User is required!"),
  type: Joi.string().valid(...Object.values(TypeOptions)).required("Type is required"),
  provider: Joi.string().required("Provider is required"),
  policyNumber: Joi.string().required("Policy Number is required"),
  coverageAmount: Joi.number(),
  premium: Joi.number(),
  renewalDate: Joi.date()
});

const InsuranceSchema = new Schema(
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
    policyNumber: {
      type: String,
    },
    coverageAmount: {
      type: Number,
    },
    premium: {
      type: Number,
    },
    renewalDate: {
      type: Date,
    }
  },
  { timestamps: true }
);
const InsuranceModel = mongoose.model("insurance", InsuranceSchema);
module.exports = { InsuranceModel, InsuranceSchemaJoi };