// Erro de dominio com status HTTP e detalhes opcionais para a resposta.
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(message: string, statusCode = 400, details?: unknown) {
    super(message);
    // Mantemos dados extras para repassar validacoes ou contexto ao cliente.
    this.statusCode = statusCode;
    this.details = details;
    this.name = "AppError";
  }
}
