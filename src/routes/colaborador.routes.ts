import { Router } from "express";
import { ColaboradorController } from "../controllers/ColaboradorController.js";

const colaboradorRoutes = Router();
const colaboradorController = new ColaboradorController();

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

export { colaboradorRoutes };
