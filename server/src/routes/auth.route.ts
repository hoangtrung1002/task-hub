import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import {
  loginController,
  registerController,
  verifyEmailController,
} from "../controller/auth.controller";
import { emailValidationMiddleware } from "../middlewares/arject.middleware";
import {
  loginSchema,
  registerSchema,
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
export const authRoutes = router;
