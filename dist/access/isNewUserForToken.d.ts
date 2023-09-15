import { Access } from 'payload/config';
/**
 * Verifica se um novo usuário pode ser criado para um token fornecido.
 *
 * @function
 * @async
 * @param {Object} args - Argumentos passados para a função.
 * @param {Object} args.req - Objeto de requisição express.
 * @param {string} args.id - ID associado ao usuário.
 * @param {Object} args.data - Dados relacionados à requisição.
 *
 * @returns {boolean} Retorna `true` se um novo usuário pode ser criado para o token fornecido. Caso contrário, retorna `false`.
 */
declare const isNewUserForToken: Access<any, any>;
export default isNewUserForToken;
