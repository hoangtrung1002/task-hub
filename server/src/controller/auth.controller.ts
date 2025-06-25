import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { registerService } from "../services/auth.service";

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
  async (req: Request, res: Response) => {}
);
