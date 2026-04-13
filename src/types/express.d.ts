import type { AuthenticatedUser } from "./auth.js";

declare global {
  namespace Express {
    // Estende a tipagem do Express para reconhecer req.user no projeto inteiro.
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

// Garante que este arquivo seja tratado como modulo pelo TypeScript.
export {};
