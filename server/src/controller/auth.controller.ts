import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  loginInService,
  registerService,
  resetPasswordService,
  resetPasswordTokenService,
  verifyEmailService,
} from "../services/auth.service";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    await registerService(body);

    res
      .status(HTTPSTATUS.CREATED)
      .json({ message: "User registered successfully" });
  }
);
export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const { userData, token } = await loginInService(body);

    res.status(HTTPSTATUS.OK).json({
      message: "Sign in successfully",
      token,
      user: userData,
    });
  }
);
export const verifyEmailController = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.body;
    await verifyEmailService(token);

    res.status(HTTPSTATUS.OK).json({ message: "Email verified successfully" });
  }
);
export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    await resetPasswordService(email);

    res
      .status(HTTPSTATUS.OK)
      .json({ message: "Reset password email sent successfully" });
  }
);

export const verifyResetPasswordTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const { token, newPassword, confirmPassword } = req.body;
    await resetPasswordTokenService(token, newPassword, confirmPassword);
    res.status(HTTPSTATUS.OK).json({
      message: "Password reset successfully",
    });
  }
);
