const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi")

const FaqSchemaJoi = Joi.object({
  question: Joi.string().required(),
  secondaryImage:Joi.string().required(),
})
const FaQSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FaQModel = mongoose.model("faq", FaQSchema);
module.exports = {FaQModel, FaqSchemaJoi};
