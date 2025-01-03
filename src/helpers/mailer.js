import nodemailer from "nodemailer";
import User from "../models/user.model";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    //generating token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5cdb733db4661e",
        pass: "c25c3df0c00057",
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: "sufidemo@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Verify Your Email Address</h2>
        <p>Thank you for registering with us. Please click the link below to verify your email address:</p>
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="color: #1a73e8;">Verify Email</a>
        <p>If you did not request this email, please ignore it.</p>
      </div>
    `
          : `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset Your Password</h2>
        <p>We received a request to reset your password. Please click the link below to reset your password:</p>
        <a href="https://yourwebsite.com/reset-password?email=${email}" style="color: #1a73e8;">Reset Password</a>
        <p>If yofu did not request this email, please ignore it.</p>
      </div>
    `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
