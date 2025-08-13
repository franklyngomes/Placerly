const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FaQSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    query: [
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
    ],
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const FaQModel = mongoose.model("faq", FaQSchema);
module.exports = FaQModel;
