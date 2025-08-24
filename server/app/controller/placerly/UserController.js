const httpCode = require("../../helper/httpServerCode");
const {
  comparePassword,
  hashedPassword,
  hmacProcess,
} = require("../../middleware/Auth");
const UserModel = require("../../model/UserModel");
const jwt = require("jsonwebtoken");
const transport = require("../../helper/SendMail");

class UserController {
  async signup(req, res) {
    try {
      const { firstName, lastName, email, password, phone } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(httpCode.conflict).json({
          status: false,
          message: "User with this email already exists",
        });
      }
      const hashed = hashedPassword(password);
      const userData = new UserModel({
        firstName, lastName,
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
                  src="http://localhost:5000/public/images/logo-png.png"
                  width="150"
                  height="60"
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
                Hi ${firstName},
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
        const data = await userData.save();
        return res.status(httpCode.create).json({
          status: true,
          message: "User Created Successfully & Verification code sent!",
          data: data,
        });
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(httpCode.notFound).json({
          status: false,
          message: "All fields are required",
        });
      }
      const user = await UserModel.findOne({ email })
      if (!user) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "User not found!",
        });
      }
      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Invalid Password!",
        });
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
      return res.status(httpCode.success).json({
        status: true,
        message: "Logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async userProfileDetails(req, res) {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found",
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "User details fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async verifyEmail(req, res) {
    try {
      const { email, code } = req.body;
      const codeValue = code.toString();
      const existingUser = await UserModel.findOne({ email })
      if (!existingUser) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found",
        });
      }
      if (existingUser.verified) {
        return res.status(httpCode.conflict).json({
          status: false,
          message: "User already verified!",
        });
      }
      if (
        !existingUser.verificationCode ||
        !existingUser.verificationCodeValidation
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Something went wrong!",
        });
      }
      if (
        Date.now() - existingUser.verificationCodeValidation >
        5 * 60 * 1000
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Verification code expired!",
        });
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
        return res.status(httpCode.success).json({
          status: true,
          message: "Email verified successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "User not found!",
        });
      }
      const codeValue = Math.floor(Math.random() * 1000000).toString();
      let info = await transport.sendMail({
        from: process.env.NODEMAILER_EMAIL_ADDRESS,
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
                  src="http://localhost:5000/public/images/logo-png.png"
                  width="150"
                  height="60"
                  alt="Medisync Logo"
                />
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 20px; font-weight: bold; color: #111827; padding-bottom: 10px;">
              Hi ${existingUser.firstName},
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 14px; color: #374151; padding-bottom: 10px;">
                OTP for your Medisync account has been created successfully:
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
        return res.status(httpCode.success).json({
          status: true,
          message: "Reset password code sent!",
        });
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;
      const codeValue = code.toString();
      const existingUser = await UserModel.findOne({ email })
      if (!existingUser) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found!",
        });
      }
      if (
        !existingUser.forgotPasswordCode ||
        !existingUser.forgotPasswordCodeValidation
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Something went wrong!",
        });
      }
      if (
        Date.now() - existingUser.forgotPasswordCodeValidation >
        5 * 60 * 1000
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Reset password code expired!",
        });
      }
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      if (hashedCodeValue === existingUser.forgotPasswordCode) {
        const hashed = hashedPassword(newPassword);
        existingUser.password = hashed;
        existingUser.forgotPasswordCode = undefined;
        existingUser.forgotPasswordCodeValidation = undefined;
        await existingUser.save();
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Password reset successful",
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new UserController();
