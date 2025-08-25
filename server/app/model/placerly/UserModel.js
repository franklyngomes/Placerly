const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const UserSchemaJoi = Joi.object({
  firstName: Joi.string().min(3).required("First name is required!"),
  lastName: Joi.string().min(5).required("Last name is required!"),
  email: Joi.string().email().required("Email is required!"),
  password: Joi.string().required("Password is required!"),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
  assets: Joi.array().items(Joi.string()),
  debts: Joi.array().items(Joi.string()),
  insurance: Joi.array().items(Joi.string()),
  utility: Joi.array().items(Joi.string()),
  transition: Joi.array().items(Joi.string()),
});
const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {

  },
  assets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "assets",
  }],
  debts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "debt",
  }],
  insurance: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "insurance",
  }],
  transition: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "transition",
  }],
    utility: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "utility",
  }],
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
  }
}, {timestamps: true});
const UserModel = mongoose.model("user", UserSchema);
module.exports = {UserModel, UserSchemaJoi};
