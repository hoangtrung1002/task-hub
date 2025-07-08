import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import {
  loginController,
  registerController,
  resetPasswordController,
  verifyEmailController,
  verifyResetPasswordTokenController,
} from "../controller/auth.controller";
import { emailValidationMiddleware } from "../middlewares/arject.middleware";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  tokenSchema,
} from "../validations/auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest({ body: registerSchema }),
  emailValidationMiddleware,
  registerController
);
router.post("/login", validateRequest({ body: loginSchema }), loginController);
router.post(
  "/verify-email",
  validateRequest({ body: tokenSchema }),
  verifyEmailController
);
router.post(
  "/reset-password-request",
  validateRequest({ body: emailSchema }),
  emailValidationMiddleware,
  resetPasswordController
);
router.post(
  "/reset-password",
  validateRequest({ body: resetPasswordSchema }),
  verifyResetPasswordTokenController
);
export const authRoutes = router;
