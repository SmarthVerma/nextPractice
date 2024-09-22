import { EMAIL_FORGOTPASS, EMAIL_VERIFICATION } from "@/constants/constants";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

export const sendEmail = async ({ email, emailType, userId }: any) => {
  // configure mail

  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType == EMAIL_VERIFICATION) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType == EMAIL_FORGOTPASS) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

const mailOptions = {
  from: "smarthverma2003@gmail.com",
  to: email,
  subject:
    emailType === EMAIL_VERIFICATION
      ? "Verify your email"
      : "Reset your password",
  html:
    emailType === EMAIL_VERIFICATION
      ? `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
           <h1 style="color: #4CAF50;">Verify Your Email</h1>
           <p>Thank you for signing up! Please click the link below to verify your email address:</p>
           <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
           <p>If you did not request this, please ignore this email.</p>
         </div>`
      : `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
           <h1 style="color: #FF5722;">Reset Your Password</h1>
           <p>You requested to reset your password. Click the link below to set a new one:</p>
           <a href="${process.env.DOMAIN}/reset?token=${hashedToken}" style="background-color: #FF5722; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
           <p>If you did not request this, please ignore this email.</p>
         </div>`, // HTML body
};


    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    console.log('Error in this mailer',)
    throw new Error(error.message);
  }
};
