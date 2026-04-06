import { NextFunction, Request, Response, Router } from "express";
import { ColaboradorController } from "../controllers/ColaboradorController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

type AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export function createColaboradorRoutes(
  colaboradorController = new ColaboradorController(),
  authMiddleware: AuthMiddleware = ensureAuthenticated
) {
  const colaboradorRoutes = Router();

  colaboradorRoutes.use(authMiddleware);

  // Cria um novo colaborador.
  colaboradorRoutes.post("/", (req, res, next) =>
    colaboradorController.store(req, res, next)
  );

  // Lista todos os colaboradores.
  colaboradorRoutes.get("/", (req, res, next) =>
    colaboradorController.index(req, res, next)
  );

  // Busca um colaborador especifico pelo id.
  colaboradorRoutes.get("/:id", (req, res, next) =>
    colaboradorController.show(req, res, next)
  );

  return colaboradorRoutes;
}

export const colaboradorRoutes = createColaboradorRoutes();
