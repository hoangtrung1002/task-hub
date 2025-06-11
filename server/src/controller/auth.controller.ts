import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import UserModel from "../models/user.models";
import { BadRequestException } from "../utils/app-error";
import { hashValue } from "../utils/bcrypt";
import { HTTPSTATUS } from "../config/http.config";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) throw new BadRequestException("Email already in use");
      const hashedPassword = await hashValue(password);
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(HTTPSTATUS.CREATED).json({
        message:
          "Verification email sent to your email. Please check and verify your account.",
      });
    } catch (error) {
      res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
      });
    }
  }
);
export const loginController = asyncHandler(
  async (req: Request, res: Response) => {}
);
