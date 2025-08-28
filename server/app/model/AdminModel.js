const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    verificationCodeValidation: {
      type: Number,
    },
    forgotPasswordCode: {
      type: String,
    },
    forgotPasswordCodeValidation: {
      type: Number,
    },
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("admin", AdminSchema);
module.exports = AdminModel;
