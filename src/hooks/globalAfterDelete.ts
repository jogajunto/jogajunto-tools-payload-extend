/**
 * @module hooks/globalAfterDelete
 * @description Este módulo fornece um hook que é executado após a exclusão
 * de um documento no Payload CMS. Este hook é responsável por preparar
 * os dados para serem enviados às Github Actions, informando sobre a
 * exclusão do documento.
 *
 * As funcionalidades principais incluem:
 * 1. Preparar os dados para informar as Github Actions sobre a exclusão.
 * 2. Enviar os dados formatados para as Github Actions.
 *
 * Este módulo é uma parte crucial para manter as Github Actions informadas
 * sobre as operações de exclusão realizadas no CMS.
 */

import { CollectionAfterDeleteHook } from 'payload/types';
import { GitData } from '../types';
import sendAction from '../utilities/actions/github/sendAction';

/**
 * Hook para ser executado após a exclusão de um documento. Este hook prepara
 * os dados formatados para serem enviados às Github Actions informando sobre a
 * exclusão do documento.
 *
 * @param {string} directory - Diretório que está sendo modificado.
 * @returns {CollectionAfterDeleteHook} Hook para ser usado após a exclusão de um documento.
 */
export const globalAfterDelete = (
  directory: string // Diretório que está sendo modificado
): CollectionAfterDeleteHook => {
  return async ({ doc }) => {
    // Prepara os dados para enviar para a Github Action
    const data: GitData = {
      event_type: 'delete',
      client_payload: {
        slug: doc.slug,
        operation: 'delete',
        directory: directory,
        content: '',
      },
    };

    // Envia para o Github Actions
    sendAction(data);

    // Retorna o documento excluído
    return doc;
  };
};
