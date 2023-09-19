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
const isNewUserForToken: Access<any, any> = async ({ req, id, data }) => {
  // Ao criar um novo usuário para um token válido, retorna verdadeiro
  if (req.body?.token) {
    if (req.user) return Boolean(false);
    const response = await req.payload.find({
      collection: 'tokennewusers',
      where: {
        token: { equals: req.body.token },
        used: { equals: false || undefined },
      },
    });
    if (response.docs.length > 0) return Boolean(true);
  } // Se o usuário existe e é um admin
  else if (req.user && req.user?.roles.includes('admin')) {
    return Boolean(true);
  }
  // Para qualquer outro caso, retorna falso
  return Boolean(false);
};

export default isNewUserForToken;
