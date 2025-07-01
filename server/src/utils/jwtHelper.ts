import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/app.config";

export interface JWTPayload {
  purpose: "email-verification" | "reset-password" | "login";
  [key: string]: any; // Allow dynamic props if needed
}
export function jwtSign(
  payload: JWTPayload,
  expiresIn: string | number = "1h"
): string {
  const secret = config.JWT_SECRET as string;

  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, secret, options);
}

export function verifyToken<T = JWTPayload>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as T;
    return decoded;
  } catch (error) {
    return null;
  }
}
