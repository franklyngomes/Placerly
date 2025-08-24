const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const TransitionSchemaJoi = Joi.object({
  userId: Joi.string().required("User is required!"),
  executors: Joi.array().items({
    name: Joi.string().required("Executor name is required!"),
    email: Joi.string().required("Executor email is required!"),
    phone: Joi.string().required("Executor phone is required!"),
  }),
  beneficiaries: Joi.array().items({
    name: Joi.string().required("Beneficiary name is required!"),
    email: Joi.string().required("Beneficiary email is required!"),
    phone: Joi.string().required("Beneficiary phone is required!"),
  })
});
const TransitionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },

  executors: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],

  beneficiaries: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const TransitionModel = mongoose.model("transition", TransitionSchema);
module.exports = {TransitionModel, TransitionSchemaJoi};
