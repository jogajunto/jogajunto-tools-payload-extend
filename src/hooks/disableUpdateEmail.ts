/**
 * @module hooks/disableUpdateEmail
 * @description Este módulo fornece um hook para prevenir a atualização do campo de e-mail 
 * em uma coleção dentro do Payload CMS. O propósito do hook é garantir que, uma vez que 
 * um e-mail é definido ou criado, ele não pode ser modificado. Tentativas de atualizar 
 * o campo de e-mail resultarão em um erro.
 */

import { CollectionBeforeChangeHook } from 'payload/types';

/**
 * Hook para prevenir a atualização do campo de e-mail em uma coleção.
 * Se uma tentativa de atualizar o e-mail for detectada, o hook lançará um erro.
 * 
 * @param data - Dados da requisição para serem salvos.
 * @param req - Objeto de requisição.
 * @param operation - Tipo de operação sendo realizada (ex: 'create', 'update').
 * @param originalDoc - Documento original antes das alterações.
 * @returns {CollectionBeforeChangeHook} Os dados que serão salvos. Lança um erro se a atualização do e-mail for detectada.
 * @throws {Error} Se houver uma tentativa de atualizar o e-mail.
 */
export const disableUpdateEmail: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
  originalDoc,
}) => {
  // Se a operação é uma atualização e o novo e-mail é diferente do original,
  // lançar um erro para impedir a mudança.
  if (
    operation === 'update' &&
    data.email &&
    data.email !== originalDoc.email
  ) {
    throw new Error('Não é possível alterar seu e-mail.');
  }
  return data;
};
