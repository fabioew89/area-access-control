import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

import { Perfil } from "../types/Perfil";

// Representa os operadores e administradores que usam a API.
@Entity("usuario")
export class Usuario {
  // UUID interno do usuario autenticavel.
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Nome exibido nas respostas e interfaces administrativas.
  @Column({ type: "text" })
  nome!: string;

  // Email unico usado como credencial de login.
  @Column({ type: "text", unique: true })
  email!: string;

  // Apenas o hash da senha e armazenado por seguranca.
  @Column({ type: "text" })
  senha_hash!: string;

  // Perfil define o nivel de permissao disponivel no sistema.
  @Column({ type: "enum", enum: Perfil, default: Perfil.OPERADOR })
  perfil!: Perfil;

  // Data de criacao preenchida automaticamente pelo banco.
  @CreateDateColumn({ type: "timestamptz" })
  criado_em!: Date;
}
