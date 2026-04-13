import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

export function createAuthRoutes(authController = new AuthController()) {
  // Router isolado para agrupar o ciclo de autenticacao.
  const authRoutes = Router();

  // Cadastro inicial de usuarios da aplicacao.
  authRoutes.post("/register", (req, res, next) =>
    authController.register(req, res, next)
  );

  // Login que emite access e refresh token.
  authRoutes.post("/login", (req, res, next) =>
    authController.login(req, res, next)
  );

  // Renovacao de credenciais a partir do refresh token.
  authRoutes.post("/refresh", (req, res, next) =>
    authController.refresh(req, res, next)
  );

  return authRoutes;
}

// Export util para uso direto quando nao ha necessidade de injecao em testes.
export const authRoutes = createAuthRoutes();
