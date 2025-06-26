import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  loginInService,
  registerService,
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
