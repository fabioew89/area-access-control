import { appDataSource } from "../database/appDataSource.js";
import { Colaborador } from "../entities/Colaborador.js";
import { AppError } from "../errors/AppError.js";
import { z } from "zod";

// Define quais dados o metodo create precisa receber.
export const createColaboradorSchema = z.object({
  nome: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres."),
  matricula: z
    .string()
    .trim()
    .min(1, "Matricula e obrigatoria.")
    .max(50, "Matricula muito longa."),
  cargo: z.string().trim().min(2, "Cargo deve ter pelo menos 2 caracteres."),
  setor: z.string().trim().min(2, "Setor deve ter pelo menos 2 caracteres."),
  foto_url: z.url("Foto deve ser uma URL valida.").optional(),
});

export type CreateColaboradorRequest = z.infer<typeof createColaboradorSchema>;

export function parseCreateColaboradorInput(input: CreateColaboradorRequest) {
  // Centraliza a validacao para reutilizar a mesma regra em controller e service.
  return createColaboradorSchema.parse(input);
}

export class ColaboradorService {
  // Repository e a ferramenta do TypeORM para acessar a tabela no banco.
  private colaboradorRepository = appDataSource.getRepository(Colaborador);

  async create({
    nome,
    matricula,
    cargo,
    setor,
    foto_url,
  }: CreateColaboradorRequest): Promise<Colaborador> {
    // Revalida os dados mesmo que eles ja tenham sido conferidos na camada HTTP.
    const data = parseCreateColaboradorInput({
      nome,
      matricula,
      cargo,
      setor,
      foto_url,
    });

    // Verifica se a matricula ja esta cadastrada antes de criar.
    const matriculaExists = await this.colaboradorRepository.findOne({
      where: { matricula: data.matricula },
    });

    if (matriculaExists) {
      throw new AppError("Ja existe um colaborador com essa matricula.", 409);
    }

    // Cria o objeto da entidade em memoria.
    const colaborador = this.colaboradorRepository.create({
      nome: data.nome,
      matricula: data.matricula,
      cargo: data.cargo,
      setor: data.setor,
      foto_url: data.foto_url,
    });

    // Salva o colaborador no banco.
    return this.colaboradorRepository.save(colaborador);
  }

  async list(): Promise<Colaborador[]> {
    // Busca todos os colaboradores ordenados pelos mais recentes.
    return this.colaboradorRepository.find({
      order: {
        criado_em: "DESC",
      },
    });
  }

  async findById(id: string): Promise<Colaborador> {
    // Procura um colaborador pelo id informado.
    const colaborador = await this.colaboradorRepository.findOne({
      where: { id },
    });

    if (!colaborador) {
      throw new AppError("Colaborador nao encontrado.", 404);
    }

    // Retorna o colaborador encontrado.
    return colaborador;
  }
}
