const httpCode = require("../helper/HttpCode");
const {
  comparePassword,
  hashPassword,
  hmacProcess,
} = require("../middleware/Auth");
const transport = require("../helper/SendMail");
const AdminModel = require("../model/AdminModel");
const jwt = require("jsonwebtoken");

class AdminController {
  async signup(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password || !phone) {
        req.flash("error", "All fields are required!");
        return res.redirect("/signup");
      }

      const existingUser = await AdminModel.findOne({ email });
      if (existingUser) {
        req.flash("error", "User with this email already exists");
        return res.redirect("/signup");
      }
      if (name.length < 3 || name.length > 30) {
        req.flash("error", "Name must be within 3 to 30  characters");
        return res.redirect("/signup");
      }

      if (!/^\d{10}$/.test(phone)) {
        req.flash("error", "Phone must be of 10 digits");
        return res.redirect("/signup");
      }
      const hashed = hashPassword(password);
      const userData = new AdminModel({
        name,
        email,
        password: hashed,
        phone,
      });
      const codeValue = Math.floor(Math.random() * 1000000).toString();
      let info = await transport.sendMail({
        from: process.env.NODEMAILER_EMAIL_ADDRESS,
        to: userData.email,
        subject: "Verify your email address",
        html: `
        <body style="margin: 0; padding: 0; background-color: #f4f4f5;">
          <table
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="padding: 40px 0;"
          >
            <tr>
              <td align="center">
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="max-width: 500px; background-color: #ffffff; border-radius: 12px; padding: 40px 20px; font-family: Arial, sans-serif;"
                >
                  <tr>
                    <td align="center" style="padding-bottom: 20px;">
                      <img
                        src="https://placerly.onrender.com/img/logo.svg"
                        width="100"
                        height="100"
                        alt="Placerly Logo"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="font-size: 20px; font-weight: bold; color: #111827; padding-bottom: 10px;">
                      Welcome to Placerly 👋
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 14px; color: #374151; padding-bottom: 10px;">
                      Hi ${name},
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 14px; color: #374151; padding-bottom: 10px;">
                      Your Placerly account has been created successfully. Use this verification code to verify your email adress
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size: 14px; color: #111827; padding-bottom: 10px;">
                      <strong>Email:</strong> ${email}<br />
                      <strong>Verification Code:</strong> ${codeValue}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        `,
      });
      if (info.accepted[0] === userData.email) {
        const hashedCodeValue = hmacProcess(
          codeValue,
          process.env.NODEMAILER_VERIFICATION_SECRET
        );
        userData.verificationCode = hashedCodeValue;
        userData.verificationCodeValidation = Date.now();
        await userData.save();
        return res.redirect("/verify-email");
      }
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/signup");
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/signin");
      }
      const user = await AdminModel.findOne({ email }).select("+password");
      if (!user) {
        req.flash("error", "User not found!");
        return res.redirect("/signin");
      }
      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        req.flash("error", "Invalid Password!");
        return res.redirect("/signin");
      }
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3hr" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set true if using HTTPS
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
      });
      return res.redirect("/");
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/signin");
    }
  }
  async signout(req, res) {
    try {
      return res.clearCookie("token").redirect("/signin");
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/");
    }
  }
  async VerifyEmail(req, res) {
    try {
      const { email, code } = req.body;
      const codeValue = code.toString();
      const existingUser = await AdminModel.findOne({ email });
      if (!existingUser) {
        req.flash("error", "Admin not found");
        return res.redirect("/verify-email");
      }
      if (existingUser.verified) {
        req.flash("error", "Admin already verified");
        return res.redirect("/verify-email");
      }
      if (
        !existingUser.verificationCode ||
        !existingUser.verificationCodeValidation
      ) {
        req.flash("error", "Something went wrong!");
        return res.redirect("/verify-email");
      }
      if (
        Date.now() - existingUser.verificationCodeValidation >
        5 * 60 * 1000
      ) {
        req.flash("error", "Verification code expired!");
        return res.redirect("/verify-email");
      }
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      if (hashedCodeValue === existingUser.verificationCode) {
        existingUser.verified = true;
        existingUser.verificationCode = undefined;
        existingUser.verificationCodeValidation = undefined;
        await existingUser.save();
        req.flash("success", "Email verified successfully");
        return res.redirect("/signin");
      }
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/verify-email");
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await AdminModel.findOne({ email });
      if (!existingUser) {
        req.flash("error", "User not found!");
        return res.redirect("/forgot-password");
      }
      const codeValue = Math.floor(Math.random() * 1000000).toString();
      let info = await transport.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: existingUser.email,
        subject: "Reset your password",
        html: `
  <body style="margin: 0; padding: 0; background-color: #f4f4f5;">
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="padding: 40px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="max-width: 500px; background-color: #ffffff; border-radius: 12px; padding: 40px 20px; font-family: Arial, sans-serif;"
          >
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img
                  src="https://placerly.onrender.com/img/logo.svg"
                  width="100"
                  height="100"
                  alt="Placerly Logo"
                />
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 20px; font-weight: bold; color: #111827; padding-bottom: 10px;">
              Hi ${existingUser.name},
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 14px; color: #374151; padding-bottom: 10px;">
                OTP for your Placerly account has been created successfully:
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 16px; color: #111827; padding-bottom: 10px;">
                <strong>OTP:</strong> ${codeValue}<br />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  `,
      });
      if (info.accepted[0] === existingUser.email) {
        const hashedCodeValue = hmacProcess(
          codeValue,
          process.env.NODEMAILER_VERIFICATION_SECRET
        );
        existingUser.forgotPasswordCode = hashedCodeValue;
        existingUser.forgotPasswordCodeValidation = Date.now();
        await existingUser.save();
        req.flash("success", "Reset Password code sent");
        return res.redirect("/reset-password");
      }
    } catch (error) {
      // req.flash("error", error);
      // return res.redirect("/forgot-password");
      return res.status(httpCode.serverError).json({
        status: false,
        message: error.message
      })
    }
  }
  async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;
      const codeValue = code.toString();
      const existingUser = await AdminModel.findOne({ email });
      if (!existingUser) {
        req.flash("error", "User not found");
        return res.redirect("/reset-password");
      }
      if (
        !existingUser.forgotPasswordCode ||
        !existingUser.forgotPasswordCodeValidation
      ) {
        req.flash("error", "Something went wrong");
        return res.redirect("/reset-password");
      }
      if (
        Date.now() - existingUser.forgotPasswordCodeValidation >
        5 * 60 * 100000
      ) {
        req.flash("error", "OTP expired");
        return res.redirect("/reset-password");
      }
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      if (hashedCodeValue === existingUser.forgotPasswordCode) {
        const hashed = hashPassword(newPassword);
        existingUser.password = hashed;
        existingUser.forgotPasswordCode = undefined;
        existingUser.forgotPasswordCodeValidation = undefined;
        await existingUser.save();
      }
      req.flash("success", "Password changed successfully");
      return res.redirect("/signin");
    } catch (error) {
      req.flash("error", error);
      return res.redirect("/reset-password");
    }
  }
}
module.exports = new AdminController();
