import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  // Espera o formato padrao "Bearer <token>" enviado no header Authorization.
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token de autenticacao nao informado.", 401);
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Cabecalho Authorization invalido.", 401);
  }

  const payload = verifyAccessToken(token);

  // Depois de validar o token, anexamos o usuario na request para uso nas rotas protegidas.
  req.user = {
    id: payload.sub,
    email: payload.email,
    perfil: payload.perfil,
  };

  next();
}
