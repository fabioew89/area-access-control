import { appDataSource } from "../database/appDataSource.js";
import { Colaborador } from "../entities/Colaborador.js";
import { AppError } from "../errors/AppError.js";

interface CreateColaboradorRequest {
  nome: string;
  matricula: string;
  cargo: string;
  setor: string;
  foto_url?: string;
}

export class ColaboradorService {
  private colaboradorRepository = appDataSource.getRepository(Colaborador);

  async create({
    nome,
    matricula,
    cargo,
    setor,
    foto_url,
  }: CreateColaboradorRequest): Promise<Colaborador> {
    const matriculaExists = await this.colaboradorRepository.findOne({
      where: { matricula },
    });

    if (matriculaExists) {
      throw new AppError("Ja existe um colaborador com essa matricula.", 409);
    }

    const colaborador = this.colaboradorRepository.create({
      nome,
      matricula,
      cargo,
      setor,
      foto_url,
    });

    return this.colaboradorRepository.save(colaborador);
  }

  async list(): Promise<Colaborador[]> {
    return this.colaboradorRepository.find({
      order: {
        criado_em: "DESC",
      },
    });
  }

  async findById(id: string): Promise<Colaborador> {
    const colaborador = await this.colaboradorRepository.findOne({
      where: { id },
    });

    if (!colaborador) {
      throw new AppError("Colaborador nao encontrado.", 404);
    }

    return colaborador;
  }
}
