const bcryptjs = require("bcryptjs");
const { createHmac } = require("crypto");
const HttpCode = require("../helper/HttpCode");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
  const salt = 10;
  const hashedPassword = bcryptjs.hashSync(password, salt);
  return hashedPassword;
};
const comparePassword = (password, hashPassword) => {
  return bcryptjs.compareSync(password, hashPassword);
};
const AuthCheck = (req, res, next) => {
  try {
    let token
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
     token = authHeader.split(" ")[1];
    }
    if(!token && req.cookies.token){
      token = req.cookies.token
    }
    if(!token){ 
      return res.status(HttpCode.unauthorized).json({
        status: false,
        message: "You're not authorized!",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(HttpCode.unauthorized).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};
const hmacProcess = (value, key) => {
  const result = createHmac("sha256", key).update(value).digest("hex");
  return result;
};

module.exports = { hashPassword, comparePassword, AuthCheck, hmacProcess };