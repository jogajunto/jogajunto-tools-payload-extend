import { Access } from 'payload/types';
import { UserType } from '../types/UserType';

/**
 * Verifica se um usuário está autenticado.
 *
 * Uma simples verificação para determinar se o objeto de solicitação possui
 * informações de usuário, indicando uma sessão autenticada.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário está autenticado, caso contrário, retorna falso.
 */
export const isAuthenticated: Access<any, UserType> = ({ req }) => {
  return Boolean(req.user);
};
