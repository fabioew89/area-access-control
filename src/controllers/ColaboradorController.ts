import { Request, Response, NextFunction } from "express";
import { ColaboradorService } from "../services/ColaboradorService.js";

export class ColaboradorController {
  private colaboradorService = new ColaboradorService();

  async store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { nome, matricula, cargo, setor, foto_url } = req.body;

      const colaborador = await this.colaboradorService.create({
        nome,
        matricula,
        cargo,
        setor,
        foto_url,
      });

      res.status(201).json(colaborador);
    } catch (error) {
      next(error);
    }
  }

  async index(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const colaboradores = await this.colaboradorService.list();

      res.json(colaboradores);
    } catch (error) {
      next(error);
    }
  }

  async show(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const colaborador = await this.colaboradorService.findById(id);

      res.json(colaborador);
    } catch (error) {
      next(error);
    }
  }
}
