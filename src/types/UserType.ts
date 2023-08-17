/**
 * Representa um tipo de usuário com identificação e possíveis funções.
 */
export type UserType = {
  id: string | number;
  roles?: string[];
};
