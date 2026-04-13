import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

// Entidade principal de pessoas que podem circular pelas areas controladas.
@Entity("Colaborador")
export class Colaborador {
  // UUID gerado automaticamente para referencia interna.
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Nome completo do colaborador.
  @Column({ type: "text", nullable: false })
  nome!: string;

  // Matricula funciona como identificador operacional e precisa ser unica.
  @Column({ type: "text", nullable: false, unique: true })
  matricula!: string;

  // Cargo atual usado para contexto administrativo.
  @Column({ type: "text", nullable: false })
  cargo!: string;

  // Setor de lotacao do colaborador.
  @Column({ type: "text", nullable: false })
  setor!: string;

  // Mantem o cadastro sem exclusao fisica quando o colaborador deixa de operar.
  @Column({ type: "boolean", default: true })
  ativo!: boolean;

  // URL opcional para foto usada em interfaces ou validacao visual.
  @Column({ type: "text", nullable: true })
  foto_url!: string;

  // Registrado automaticamente no momento da criacao.
  @CreateDateColumn({ type: "timestamptz" })
  criado_em!: Date;
}
