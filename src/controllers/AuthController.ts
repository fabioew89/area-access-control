import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
  // O controller so organiza entrada/saida HTTP; a regra de negocio fica no service.
  constructor(private authService = new AuthService()) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Encaminha o corpo da requisicao para o fluxo de cadastro.
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        // Padroniza erros de validacao para o middleware global.
        next(new AppError("Dados de entrada invalidos.", 400, error.flatten()));
        return;
      }

      // Repassa erros de dominio e erros inesperados sem mascarar a origem.
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Login devolve o usuario autenticado junto com o par de tokens.
      const result = await this.authService.login(req.body);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError("Dados de entrada invalidos.", 400, error.flatten()));
        return;
      }

      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Refresh recebe um token valido e devolve um novo conjunto de credenciais.
      const result = await this.authService.refresh(req.body);
      res.json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError("Dados de entrada invalidos.", 400, error.flatten()));
        return;
      }

      next(error);
    }
  }
}
