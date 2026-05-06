import { EventEmitter } from "node:events";
import { template } from "../Email/template.js";
import { sendEmail } from "../Email/email.utils.js";

export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const eventEmitter = new EventEmitter();

eventEmitter.on("confirmEmail", async (data) => {
  try {
    await sendEmail({
      to: data.to,
      subject: "Confirm Email",
      html: template(data.otp, data.firstName),
    });
  } catch (err) {
    console.log("Email Error:", err.message);
  }
});

eventEmitter.on("forgetPassword", async (data) => {
  try {
    await sendEmail({
      to: data.to,
      subject: "Reset Password",
      html: template(data.otp, data.firstName),
    });
  } catch (err) {
    console.log("Email Error:", err.message);
  }
});
