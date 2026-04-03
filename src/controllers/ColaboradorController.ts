import { Request, Response, NextFunction } from "express";
import { ColaboradorService } from "../services/ColaboradorService.js";

export class ColaboradorController {
  // O controller delega a regra de negocio para o service.
  private colaboradorService = new ColaboradorService();

  async store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Le os dados enviados no corpo da requisicao.
      const { nome, matricula, cargo, setor, foto_url } = req.body;

      // Chama o service para criar o colaborador.
      const colaborador = await this.colaboradorService.create({
        nome,
        matricula,
        cargo,
        setor,
        foto_url,
      });

      // 201 indica que um novo registro foi criado com sucesso.
      res.status(201).json(colaborador);
    } catch (error) {
      // Encaminha qualquer erro para o middleware global.
      next(error);
    }
  }

  async index(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Busca a lista completa de colaboradores.
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
      // Le o id vindo da URL para buscar um unico colaborador.
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const colaborador = await this.colaboradorService.findById(id);

      res.json(colaborador);
    } catch (error) {
      next(error);
    }
  }
}
