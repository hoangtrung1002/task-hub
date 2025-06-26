import { isSpoofedBot } from "@arcjet/inspect";
import { NextFunction, Request, Response } from "express";
import { ajBotProtection, ajEmailValidation } from "../config/arject.config";
import { HTTPSTATUS } from "../config/http.config";
import { ErrorCodeEnum } from "../enums/error-code.enum";
import { BadRequestException, HttpException } from "../utils/app-error";

export const botProtectionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await ajBotProtection.protect(req, { requested: 5 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new HttpException(
          "Too many requests",
          HTTPSTATUS.TOO_MANY_REQUESTS,
          ErrorCodeEnum.AUTH_TOO_MANY_ATTEMPTS
        );
      }
      if (decision.reason.isBot()) {
        throw new HttpException(
          "No bots allowed",
          HTTPSTATUS.FORBIDDEN,
          ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
        );
      }
      throw new HttpException(
        "Forbidden",
        HTTPSTATUS.FORBIDDEN,
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }

    if (decision.results.some(isSpoofedBot)) {
      throw new HttpException(
        "Spoofed bot detected",
        HTTPSTATUS.FORBIDDEN,
        ErrorCodeEnum.AUTH_UNAUTHORIZED_ACCESS
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const emailValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body?.email;
  try {
    const decision = await ajEmailValidation.protect(req, { email });

    if (decision.isDenied()) {
      throw new BadRequestException("Invalid or blocked email");
    }

    next();
  } catch (err) {
    next(err);
  }
};
