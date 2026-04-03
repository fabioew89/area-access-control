import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Colaborador } from "./Colaborador";
import { Area } from "./Area";
import { Usuario } from "./Usuario";

export enum TipoMovimento {
  ENTRADA = "entrada",
  SAIDA = "saida",
}

@Entity("registro_acesso")
export class RegistroAcesso {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Colaborador)
  @JoinColumn({ name: "colaborador_id" })
  colaborador!: Colaborador;

  @ManyToOne(() => Area)
  @JoinColumn({ name: "area_id" })
  area!: Area;

  @Column({
    type: "enum",
    enum: TipoMovimento,
  })
  tipo!: TipoMovimento;

  @Column({ type: "boolean" })
  autorizado!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  timestamp!: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "registrado_por" })
  registrado_por!: Usuario;

  @Column({ type: "text", nullable: true })
  observacao?: string;
}
