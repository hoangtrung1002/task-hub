import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import {
  loginController,
  registerController,
} from "../controller/auth.controller";
import { emailValidationMiddleware } from "../middlewares/arject.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest({ body: registerSchema }),
  emailValidationMiddleware,
  registerController
);
router.post("/login", validateRequest({ body: loginSchema }), loginController);

export const authRoutes = router;
