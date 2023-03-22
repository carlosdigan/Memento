import { validateRequest } from "zod-express-middleware";
import { Router } from "express";
import {
  login,
  loginValidation,
  register,
  registerValidation,
} from "../controllers/auth";

export const authRouter = Router();

authRouter.post("/login", validateRequest({ body: loginValidation }), login);
authRouter.post("/register", validateRequest({ body: registerValidation }), register);
