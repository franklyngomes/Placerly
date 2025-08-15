const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    primaryImage: {
      type: String,
      required: true,
    },
    secondaryImage: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const BannerModel = mongoose.model('banner', BannerSchema)
module.exports = BannerModel