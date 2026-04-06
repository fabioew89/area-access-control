import { Perfil } from "./Perfil.js";

export interface AuthenticatedUser {
  id: string;
  email: string;
  perfil: Perfil;
}
