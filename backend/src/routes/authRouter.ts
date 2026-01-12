import { Router } from "express";
import authController from "../controllers/authController";
import { validate } from "../middleware/validateRequest";
import { loginSchema, registerSchema } from "../validators/authValidator";
import { authRateLimiter } from "../middleware/security";

const authRouter = Router();

authRouter.post("/login", authRateLimiter, validate(loginSchema), authController.login);
authRouter.post("/register", authRateLimiter, validate(registerSchema), authController.register);

export default authRouter;
