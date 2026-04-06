import bcrypt from "bcryptjs";
import { z } from "zod";
import { appDataSource } from "../database/appDataSource.js";
import { Usuario } from "../entities/Usuario.js";
import { AppError } from "../errors/AppError.js";
import { Perfil } from "../types/Perfil.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const registerSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres."),
  email: z.email("Email invalido.").transform((value) => value.toLowerCase()),
  senha: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres.")
    .max(100, "Senha muito longa."),
  perfil: z
    .union([z.nativeEnum(Perfil), z.enum(["ADMIN", "OPERADOR"])])
    .transform((value) => {
      if (value === "ADMIN") {
        return Perfil.ADMIN;
      }

      if (value === "OPERADOR") {
        return Perfil.OPERADOR;
      }

      return value;
    })
    .optional(),
});

const loginSchema = z.object({
  email: z.email("Email invalido.").transform((value) => value.toLowerCase()),
  senha: z.string().min(1, "Senha e obrigatoria."),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token e obrigatorio."),
});

type RegisterRequest = z.infer<typeof registerSchema>;
type LoginRequest = z.infer<typeof loginSchema>;
type RefreshRequest = z.infer<typeof refreshSchema>;

export class AuthService {
  private usuarioRepository = appDataSource.getRepository(Usuario);

  async register(input: RegisterRequest) {
    const data = registerSchema.parse(input);

    const existingUser = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError("Ja existe um usuario com esse email.", 409);
    }

    const senha_hash = await bcrypt.hash(data.senha, 10);

    const user = this.usuarioRepository.create({
      nome: data.nome,
      email: data.email,
      senha_hash,
      perfil: data.perfil ?? Perfil.OPERADOR,
    });

    const savedUser = await this.usuarioRepository.save(user);

    return this.buildAuthResponse(savedUser);
  }

  async login(input: LoginRequest) {
    const data = loginSchema.parse(input);

    const user = await this.usuarioRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError("Email ou senha invalidos.", 401);
    }

    const senhaValida = await bcrypt.compare(data.senha, user.senha_hash);

    if (!senhaValida) {
      throw new AppError("Email ou senha invalidos.", 401);
    }

    return this.buildAuthResponse(user);
  }

  async refresh(input: RefreshRequest) {
    const data = refreshSchema.parse(input);
    const payload = verifyRefreshToken(data.refreshToken);

    const user = await this.usuarioRepository.findOne({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new AppError("Usuario do refresh token nao encontrado.", 404);
    }

    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: Usuario) {
    const tokenPayload = {
      sub: user.id,
      email: user.email,
      perfil: user.perfil,
    };

    const accessToken = signAccessToken(tokenPayload);
    const refreshToken = signRefreshToken(tokenPayload);

    return {
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: Perfil[user.perfil],
        criado_em: user.criado_em,
      },
      accessToken,
      refreshToken,
    };
  }
}
