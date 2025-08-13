const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptionOne: {
      type: String,
      required: true,
    },
    descriptionTwo: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
    values: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AboutModel = mongoose.model("about", AboutSchema);
module.exports = AboutModel;
