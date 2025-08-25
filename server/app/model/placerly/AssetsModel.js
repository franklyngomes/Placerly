const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const TypeOptions = {
  CASH: "Cash",
  SHARE: "Stocks",
};

const AssetsSchemaJoi = Joi.object({
  userId: Joi.string().required("User is required!"),
  type: Joi.string().valid(...Object.values(TypeOptions)).required("Type is required"),
  provider: Joi.string().required("Provider is required"),
  accountName: Joi.string().required("Account Name is required"),
  accountNumber: Joi.string().optional(),
  balance: Joi.number(),
});

const AssetsSchema = new Schema(
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
    accountName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const AssetsModel = mongoose.model("assets", AssetsSchema);
module.exports = { AssetsModel, AssetsSchemaJoi };
