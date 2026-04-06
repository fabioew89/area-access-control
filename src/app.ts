import express from "express";
import type { NextFunction, Request, Response } from "express";
import { AuthController } from "./controllers/AuthController.js";
import { ColaboradorController } from "./controllers/ColaboradorController.js";
import { AppError } from "./errors/AppError.js";
import { createAuthRoutes } from "./routes/auth.routes.js";
import { createColaboradorRoutes } from "./routes/colaborador.routes.js";

type AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

interface CreateAppOptions {
  authController?: AuthController;
  colaboradorController?: ColaboradorController;
  colaboradorAuthMiddleware?: AuthMiddleware;
}

export function createApp(options: CreateAppOptions = {}) {
  const app = express();

  app.use(express.json());
  app.use("/auth", createAuthRoutes(options.authController));
  app.use(
    "/colaboradores",
    createColaboradorRoutes(
      options.colaboradorController,
      options.colaboradorAuthMiddleware
    )
  );

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", mensagem: "Servidor funcionando!" });
  });

  app.use(
    (
      error: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          message: error.message,
          details: error.details,
        });
      }

      console.error(error);

      return res.status(500).json({
        message: "Erro interno do servidor.",
      });
    }
  );

  return app;
}
