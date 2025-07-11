import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/app-error";
import { verifyToken } from "../utils/jwtHelper";
import UserModel, { UserDocument } from "../models/user.models";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Unauthorized, Please login");
    }
    const decoded = verifyToken(token);
    const user: UserDocument | null = await UserModel.findById(decoded?.userId);
    if (!user) throw new UnauthorizedException("Unauthorized");
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
