import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("Colaborador")
export class Colaborador {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: false })
  nome!: string;

  @Column({ type: "text", nullable: false, unique: true })
  matricula!: string;

  @Column({ type: "text", nullable: false })
  cargo!: string;

  @Column({ type: "text", nullable: false })
  setor!: string;

  @Column({ type: "boolean", default: true })
  ativo!: boolean;

  @Column({ type: "text", nullable: true })
  foto_url!: string;

  @CreateDateColumn({ type: "timestamptz" })
  criado_em!: Date;
}
