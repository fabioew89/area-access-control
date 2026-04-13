import { DataSource } from "typeorm";
import { Area } from "../entities/Area.js";
import { Colaborador } from "../entities/Colaborador.js";
import { RegistroAcesso } from "../entities/RegistroAcess.js";
import { Usuario } from "../entities/Usuario.js";

export const appDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,

  // synchronize agiliza o desenvolvimento, mas deve ser revisado antes de uso em producao.
  synchronize: true,
  logging: false,
  entities: [Area, Colaborador, RegistroAcesso, Usuario],
});
