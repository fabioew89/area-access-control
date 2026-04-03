import { Router } from "express";
import { ColaboradorController } from "../controllers/ColaboradorController.js";

const colaboradorRoutes = Router();
const colaboradorController = new ColaboradorController();

colaboradorRoutes.post("/", (req, res, next) =>
  colaboradorController.store(req, res, next)
);

colaboradorRoutes.get("/", (req, res, next) =>
  colaboradorController.index(req, res, next)
);

colaboradorRoutes.get("/:id", (req, res, next) =>
  colaboradorController.show(req, res, next)
);

export { colaboradorRoutes };
