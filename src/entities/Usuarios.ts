import { text } from "node:stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { string } from "zod";

@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column({ type: "text", nullable: false })
  name!: string;

  @Column({ type: "text", nullable: false })
  pass!: string;

  @Column({ type: "text", nullable: false })
  email!: string;
}
