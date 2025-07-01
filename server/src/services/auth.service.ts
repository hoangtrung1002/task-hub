import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { config } from "../config/app.config";
import UserModel, { UserDocument } from "../models/user.models";
import VerificationModel from "../models/verification.model";
import {
  BadRequestException,
  ExternalServerException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/app-error";
import { compareValue, hashValue } from "../utils/bcrypt";
import { sendEmail, sendEmailResetPassword } from "../utils/send-email";
import { jwtSign, verifyToken } from "../utils/jwtHelper";

const EXPIRES_AT = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
const RESET_PASSWORD_EXPIRES_AT = 15 * 60 * 1000; // 1 hour in milliseconds

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

    const verificationToken = jwtSign({
      userId: newUser._id,
      purpose: "email-verification",
    });

    await new VerificationModel({
      userId: newUser._id,
      token: verificationToken,
      expiresAt: new Date(Date.now() + EXPIRES_AT),
    }).save({ session });

    // SEND EMAIL
    const isEmailSent = await sendEmail(email, verificationToken);

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

export async function loginInService(body: {
  email: string;
  password: string;
}) {
  const { email, password } = body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new BadRequestException("Invalid email or password");

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (!user.isEmailVerified) {
      const existingVerification = await VerificationModel.findOne({
        userId: user._id,
      }).session(session);

      if (existingVerification && existingVerification.expiresAt > new Date()) {
        throw new BadRequestException(
          "Email not verified. Please check your email"
        );
      } else {
        await VerificationModel.findByIdAndDelete(
          existingVerification._id
        ).session(session);

        const verificationToken = jwtSign({
          userId: String(user._id),
          purpose: "email-verification",
        });

        await new VerificationModel({
          userId: user._id,
          token: verificationToken,
          expiresAt: new Date(Date.now() + EXPIRES_AT),
        }).save({ session });
        // SEND EMAIL
        const isEmailSent = await sendEmail(email, verificationToken);

        if (!isEmailSent)
          throw new ExternalServerException(
            "Failed to send verification email"
          );
      }
    }
    const isValidPassword = compareValue(password, user.password);
    if (!isValidPassword)
      throw new BadRequestException("Invalid email or password");

    const token = jwtSign({ userId: user._id, purpose: "login" }, "7d");

    user.lastLogin = new Date();
    await user.save();

    const userData = user.toObject();
    delete userData.password;

    await session.commitTransaction();
    session.endSession();

    return { userData, token };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

export const verifyEmailService = async (token: string) => {
  const payload = verifyToken(token);

  if (!payload || typeof payload === "string") {
    throw new UnauthorizedException("Unauthorized");
  }
  const { userId, purpose } = payload;
  if (purpose !== "email-verification") {
    throw new UnauthorizedException("Unauthorized");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const verification = await VerificationModel.findOne({ token, userId });
    if (!verification) {
      throw new NotFoundException("Invalid credentials");
    }
    const isTokenExpired = verification.expiresAt < new Date();
    if (isTokenExpired) {
      throw new UnauthorizedException("Token expired");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException("Invalid credentials");
    }
    user.isEmailVerified = true;
    await user.save({ session });

    await VerificationModel.findByIdAndDelete(verification._id).session(
      session
    );

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export async function resetPasswordService(email: string) {
  const user: UserDocument | null = await UserModel.findOne({ email });
  if (!user) throw new BadRequestException("User not found");
  if (!user.isEmailVerified) {
    throw new BadRequestException("Please verify your email first.");
  }

  const verification = await VerificationModel.findOne({ useId: user._id });
  if (verification && verification.expiresAt > new Date()) {
    throw new BadRequestException("Reset password request already sent");
  }
  if (verification && verification.expiresAt < new Date()) {
    await VerificationModel.findByIdAndDelete(verification._id);
  }

  const resetPasswordToken = jwtSign(
    {
      userId: user._id,
      purpose: "reset-password",
    },
    "15m"
  );

  await VerificationModel.create({
    userId: user._id,
    token: resetPasswordToken,
    expiresAt: new Date(Date.now() + RESET_PASSWORD_EXPIRES_AT),
  });

  const isEmailSent = await sendEmailResetPassword(email, resetPasswordToken);
  if (!isEmailSent) {
    throw new ExternalServerException("Failed to send reset password email");
  }

  return;
}

export async function resetPasswordTokenService(
  token: string,
  newPassword: string,
  confirmPassword: string
) {
  const payload = verifyToken(token);
  if (!payload) throw new UnauthorizedException("Unauthorized");

  const { userId, purpose } = payload;
  if (purpose !== "reset-password") {
    throw new UnauthorizedException("Unauthorized");
  }

  const verification = await VerificationModel.findOne({ userId, token });
  if (!verification) throw new UnauthorizedException("Unauthorized");

  const isTokenExpired = verification.expiresAt < new Date();
  if (isTokenExpired) {
    throw new UnauthorizedException("Token expired");
  }

  const user = await UserModel.findById(userId);
  if (!user) {
    throw new UnauthorizedException("Unauthorized");
  }
  if (newPassword !== confirmPassword)
    throw new BadRequestException("Passwords do not match");

  const hashedPassword = await hashValue(newPassword);

  user.password = hashedPassword;
  await user.save();

  await VerificationModel.findByIdAndDelete(verification._id);
  return;
}
