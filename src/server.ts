import "reflect-metadata";
import "dotenv/config";
import { appDataSource } from "./database/appDataSource.js";
import { createApp } from "./app.js";

const app = createApp();
const PORT = process.env.PORT ?? 3000;

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
