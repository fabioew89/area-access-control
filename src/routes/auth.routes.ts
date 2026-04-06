import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

export function createAuthRoutes(authController = new AuthController()) {
  const authRoutes = Router();

  authRoutes.post("/register", (req, res, next) =>
    authController.register(req, res, next)
  );

  authRoutes.post("/login", (req, res, next) =>
    authController.login(req, res, next)
  );

  authRoutes.post("/refresh", (req, res, next) =>
    authController.refresh(req, res, next)
  );

  return authRoutes;
}

export const authRoutes = createAuthRoutes();
