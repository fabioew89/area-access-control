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

// Enum local usado no mapeamento desta entidade para registrar o sentido do acesso.
export enum TipoMovimento {
  ENTRADA = "entrada",
  SAIDA = "saida",
}

// Guarda o historico de tentativas e autorizacoes de entrada ou saida.
@Entity("registro_acesso")
export class RegistroAcesso {
  // Identificador unico de cada evento de acesso.
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Colaborador que tentou entrar ou sair da area.
  @ManyToOne(() => Colaborador)
  @JoinColumn({ name: "colaborador_id" })
  colaborador!: Colaborador;

  // Area alvo do movimento registrado.
  @ManyToOne(() => Area)
  @JoinColumn({ name: "area_id" })
  area!: Area;

  // Indica se o evento foi entrada ou saida.
  @Column({
    type: "enum",
    enum: TipoMovimento,
  })
  tipo!: TipoMovimento;

  // Resultado da decisao de acesso para auditoria posterior.
  @Column({ type: "boolean" })
  autorizado!: boolean;

  // Momento exato em que o evento foi persistido.
  @CreateDateColumn({ type: "timestamptz" })
  timestamp!: Date;

  // Usuario do sistema responsavel por registrar a ocorrencia.
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "registrado_por" })
  registrado_por!: Usuario;

  // Observacoes adicionais, como motivo de bloqueio ou excecao operacional.
  @Column({ type: "text", nullable: true })
  observacao?: string;
}
