import "reflect-metadata";
import express from "express";
import "dotenv/config";
import { appDataSource } from "./database/appDataSource.js";
import { colaboradorRoutes } from "./routes/colaborador.routes.js";
import { AppError } from "./errors/AppError.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/colaboradores", colaboradorRoutes);

// Rota de teste para confirmar que o servidor está funcionando
app.get("/health", (_req, res) => {
  res.json({ status: "ok", mensagem: "Servidor funcionando!" });
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Erro interno do servidor.",
  });
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar o banco:", error);
  });
