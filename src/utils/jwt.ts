import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import { Perfil } from "../types/Perfil.js";

function getAccessSecret(): string {
  const accessSecret = process.env.JWT_ACCESS_SECRET;

  if (!accessSecret) {
    throw new Error("JWT_ACCESS_SECRET nao configurado.");
  }

  return accessSecret;
}

function getRefreshSecret(): string {
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!refreshSecret) {
    throw new Error("JWT_REFRESH_SECRET nao configurado.");
  }

  return refreshSecret;
}

export interface JwtPayload {
  sub: string;
  email: string;
  perfil: Perfil;
}

export function signAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, getAccessSecret(), {
    expiresIn: "15m",
  });
}

export function signRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, getAccessSecret()) as unknown as JwtPayload;
  } catch {
    throw new AppError("Token invalido ou expirado.", 401);
  }
}

export function verifyRefreshToken(token: string): JwtPayload {
  try {
    return jwt.verify(token, getRefreshSecret()) as unknown as JwtPayload;
  } catch {
    throw new AppError("Refresh token invalido ou expirado.", 401);
  }
}
