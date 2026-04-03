import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { Perfil } from "../types/Perfil";

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  nome!: string;

  @Column({ type: "text", unique: true })
  email!: string;

  @Column({ type: "text" })
  senha_hash!: string;

  @Column({ type: "enum", enum: Perfil, default: Perfil.OPERADOR })
  perfil!: Perfil;

  @CreateDateColumn({ type: "timestamptz" })
  criado_em!: Date;
}
