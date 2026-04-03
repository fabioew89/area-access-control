import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Colaborador } from "./Colaborador";
import { NivelRisco } from "../types/NivelRisco";

@Entity("area")
export class Area {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  nome!: string;

  @Column({ type: "text", nullable: true })
  descricao?: string;

  @Column({ type: "enum", enum: NivelRisco })
  nivel_risco!: NivelRisco;

  @Column({ type: "int" })
  capacidade!: number;

  @ManyToOne(() => Colaborador)
  @JoinColumn({ name: "responsavel_id" })
  responsavel!: Colaborador;

  @Column({ type: "boolean", default: true })
  ativa!: boolean;
}
