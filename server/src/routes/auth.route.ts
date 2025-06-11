import { Router } from "express";
import { validateRequest } from "zod-express-middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import {
  loginController,
  registerController,
} from "../controller/auth.controller";

const router = Router();

router.post(
  "/register",
  validateRequest({ body: registerSchema }),
  registerController
);
router.post("/login", validateRequest({ body: loginSchema }), loginController);

export const authRoutes = router;
