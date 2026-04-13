import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import {
  ColaboradorService,
  parseCreateColaboradorInput,
} from "../services/ColaboradorService.js";

export class ColaboradorController {
  // O controller concentra a camada HTTP e delega persistencia e regras ao service.
  constructor(private colaboradorService = new ColaboradorService()) {}

  async store(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Le os dados enviados no corpo da requisicao.
      const { nome, matricula, cargo, setor, foto_url } = req.body;
      // Faz uma validacao rapida ainda na borda da API antes de chegar ao service.
      const data = parseCreateColaboradorInput({
        nome,
        matricula,
        cargo,
        setor,
        foto_url,
      });

      // Chama o service para criar o colaborador.
      const colaborador = await this.colaboradorService.create(data);

      // 201 indica que um novo registro foi criado com sucesso.
      res.status(201).json(colaborador);
    } catch (error) {
      if (error instanceof ZodError) {
        // Flatten transforma os erros do Zod em um formato mais simples para o cliente.
        next(new AppError("Dados de entrada invalidos.", 400, error.flatten()));
        return;
      }

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

      // A resposta segue o retorno bruto do service porque nao ha transformacao extra aqui.
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
      // A busca centraliza a regra de 404 no service.
      const colaborador = await this.colaboradorService.findById(id);

      res.json(colaborador);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError("Dados de entrada invalidos.", 400, error.flatten()));
        return;
      }

      next(error);
    }
  }
}
