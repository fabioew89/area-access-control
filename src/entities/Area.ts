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

  @Column()
  nome!: string;

  @Column({ nullable: true })
  descricao?: string;

  @Column({ type: "enum", enum: NivelRisco })
  nivel_risco!: NivelRisco;

  @Column()
  capacidade!: number;

  @ManyToOne(() => Colaborador)
  @JoinColumn({ name: "responsavel_id" })
  responsavel!: Colaborador;

  @Column({ default: true })
  ativa!: boolean;
}
