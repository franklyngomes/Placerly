const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const TypeOptions = {
  CARD: "Credit Card",
  MORTGAGE: "Mortgage",
};

const DebtSchemaJoi = Joi.object({
  userId: Joi.string().required("User is required!"),
  type: Joi.string().valid(...Object.values(TypeOptions)).required("Type is required"),
  provider: Joi.string().required("Provider is required"),
  accountName: Joi.string().required("Account Name is required"),
  accountNumber: Joi.string().optional(),
  outstandingAmount: Joi.number(),
  dueDate:Joi.date()
});

const DebtSchema = new Schema(
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
    outstandingAmount: {
      type: Number,
      default: 0,
    },
    dueDate: {
      type: Date,
    }
  },
  { timestamps: true }
);
const DebtModel = mongoose.model("debt", DebtSchema);
module.exports = { DebtModel, DebtSchemaJoi };
