import { Document } from 'payload/types';

/**
 * Representa um tipo de usuário com identificação e possíveis funções.
 */
export type UserType = {
  id: string | number;
  roles?: string[];
  doc?: Document;
};
