/**
 * @module hooks/validatePasswords
 * @description Este módulo fornece um hook que valida senhas conforme critérios específicos
 * antes da criação ou atualização de um documento no Payload CMS. O objetivo é garantir
 * que as senhas definidas pelos usuários atendam a um conjunto de regras de segurança.
 *
 * Esse módulo ajuda a garantir que os usuários do sistema definam senhas robustas, aumentando
 * a segurança do sistema.
 */

import { CollectionBeforeChangeHook } from 'payload/types';

/**
 * Este hook valida as senhas de acordo com os seguintes critérios:
 * - A senha deve ser uma string.
 * - A senha deve ter pelo menos 8 caracteres.
 * - A senha deve conter pelo menos um número.
 * - A senha deve conter pelo menos uma letra minúscula.
 * - A senha deve conter pelo menos uma letra maiúscula.
 * - A senha deve conter pelo menos um caractere especial (como !, @, #, etc.).
 *
 * Se a senha não atender a qualquer um desses critérios, um erro é lançado.
 *
 * @returns Os dados originais se a senha for válida.
 * @throws {Error} Se a senha for inválida de acordo com os critérios estabelecidos.
 */

export const validatePasswords: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
  originalDoc,
}) => {
  if (operation === 'create' || (operation === 'update' && data.password)) {
    const MIN_LENGTH = 8;

    if (typeof data.password !== 'string') {
      throw new Error('A senha deve ser uma string.');
    }

    if (data.password.length < MIN_LENGTH) {
      throw new Error('A senha deve ter pelo menos 8 caracteres.');
    }

    if (!/\d/.test(data.password)) {
      throw new Error('A senha deve conter pelo menos um número.');
    }

    if (!/[a-z]/.test(data.password)) {
      throw new Error('A senha deve conter pelo menos uma letra minúscula.');
    }

    if (!/[A-Z]/.test(data.password)) {
      throw new Error('A senha deve conter pelo menos uma letra maiúscula.');
    }

    if (!/[!@#$%^&*(),.?":{}|<>_-]/.test(data.password)) {
      throw new Error('A senha deve conter pelo menos um caractere especial.');
    }
  }
  return data;
};
