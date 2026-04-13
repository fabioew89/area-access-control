import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Colaborador } from "./Colaborador";
import { NivelRisco } from "../types/NivelRisco";

// Representa os espacos fisicos ou logicos cujo acesso sera controlado.
@Entity("area")
export class Area {
  // Identificador unico gerado pelo banco.
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Nome exibido para operadores e relatorios.
  @Column({ type: "text" })
  nome!: string;

  // Campo livre para detalhar a finalidade da area.
  @Column({ type: "text", nullable: true })
  descricao?: string;

  // Define o nivel de restricao ou sensibilidade do ambiente.
  @Column({ type: "enum", enum: NivelRisco })
  nivel_risco!: NivelRisco;

  // Capacidade maxima esperada para uso operacional ou validacoes futuras.
  @Column({ type: "int" })
  capacidade!: number;

  // Vincula um colaborador responsavel pela area.
  @ManyToOne(() => Colaborador)
  @JoinColumn({ name: "responsavel_id" })
  responsavel!: Colaborador;

  // Permite desativar a area sem excluir o historico associado.
  @Column({ type: "boolean", default: true })
  ativa!: boolean;
}
