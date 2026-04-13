import { Perfil } from "./Perfil.js";

// Estrutura minima anexada na request apos autenticacao bem-sucedida.
export interface AuthenticatedUser {
  id: string;
  email: string;
  perfil: Perfil;
}
