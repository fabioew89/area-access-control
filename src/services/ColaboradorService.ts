import { appDataSource } from "../database/appDataSource.js";
import { Colaborador } from "../entities/Colaborador.js";
import { AppError } from "../errors/AppError.js";

// Define quais dados o metodo create precisa receber.
interface CreateColaboradorRequest {
  nome: string;
  matricula: string;
  cargo: string;
  setor: string;
  foto_url?: string;
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
    // Verifica se a matricula ja esta cadastrada antes de criar.
    const matriculaExists = await this.colaboradorRepository.findOne({
      where: { matricula },
    });

    if (matriculaExists) {
      throw new AppError("Ja existe um colaborador com essa matricula.", 409);
    }

    // Cria o objeto da entidade em memoria.
    const colaborador = this.colaboradorRepository.create({
      nome,
      matricula,
      cargo,
      setor,
      foto_url,
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
