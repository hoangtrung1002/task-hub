import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { config } from "../config/app.config";
import UserModel, { UserDocument } from "../models/user.models";
import VerificationModel from "../models/verification.model";
import {
  BadRequestException,
  ExternalServerException,
} from "../utils/app-error";
import { hashValue } from "../utils/bcrypt";
import { sendEmail } from "../utils/send-email";

const EXPIRES_AT = 1 * 60 * 60 * 1000; // 1 hour in milliseconds

export async function registerService(body: {
  name: string;
  email: string;
  password: string;
}) {
  const { name, email, password } = body;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new BadRequestException("Email already in use");
    const hashedPassword = await hashValue(password);
    const newUser: UserDocument = await new UserModel({
      name,
      email,
      password: hashedPassword,
    }).save({ session });

    const verificationToken = jwt.sign(
      { userId: newUser._id, property: "email-verification" },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await new VerificationModel({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + EXPIRES_AT),
    }).save({ session });

    // SEND EMAIL
    const verificationLink = `${config.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const emailContent = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;
    const emailSubject = "Email Verification";
    const isEmailSent = await sendEmail(email, emailSubject, emailContent);

    if (!isEmailSent)
      throw new ExternalServerException("Failed to send verification email");

    await session.commitTransaction();
    session.endSession();

    return newUser;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
