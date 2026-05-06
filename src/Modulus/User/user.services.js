import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../DB/Models/userModel.js";
import { eventEmitter, generateOTP } from "../../Utils/Events/event.utils.js";
import { sendEmail } from "../../Utils/Email/email.utils.js";
import { template } from "../../Utils/Email/template.js";

export const createUser = async (data) => {
  if (!data.email || !data.password) {
    throw new Error("Email and password are required");
  }

  const exist = await User.findOne({ email: data.email });
  if (exist) {
    throw new Error("Email already exists");
  }

  const hash = await bcrypt.hash(data.password, 10);
  const otp = generateOTP();

  const user = await User.create({
    ...data,
    password: hash,
    emailOTP: otp,
    emailOTPExpire: Date.now() + 10 * 60 * 1000,
    confirmedEmail: false,
  });

  await eventEmitter.emit("confirmEmail", {
    to: data.email,
    otp,
    firstName: data.firstName,
  });

  return user;
};

export const confirmEmail = async ({ email, otp }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.emailOTP || user.emailOTP !== otp) {
    throw new Error("Invalid OTP");
  }

  if (user.emailOTPExpire < Date.now()) {
    throw new Error("OTP expired");
  }

  user.confirmedEmail = true;
  user.confirmedEmailAt = Date.now();
  user.emailOTP = null;
  user.emailOTPExpire = null;

  await user.save();
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.confirmedEmail) {
    throw new Error("Email not confirmed");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return token;
};
