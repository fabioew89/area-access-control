import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError.js";
import { AuthService } from "../services/AuthService.js";

export class AuthController {
  constructor(private authService = new AuthService()) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError("Dados de entrada invalidos.", 400, error.flatten()));
        return;
      }

      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
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
