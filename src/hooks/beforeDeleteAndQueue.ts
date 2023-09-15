/**
 * @module beforeDeleteAndQueue
 * @description Este módulo fornece um hook para ser utilizado antes da deleção de um 
 * documento em uma coleção no Payload CMS. O hook permite adicionar o documento a uma 
 * fila para processamento posterior, o que é útil para casos em que ações adicionais 
 * devem ser executadas após a deleção de um documento, como notificações, logs ou 
 * operações em outros sistemas.
 */

import payload from 'payload';
import { CollectionBeforeDeleteHook } from 'payload/types';
import { addToQueue } from '../queue/queueManagerMemory';
import { CollectionName, FormatterCollection } from '../types';

/**
 * Função que é executada antes da deleção de um documento em uma coleção.
 * Quando um documento é deletado, ele é adicionado a uma fila para processamento posterior.
 * 
 * @param {string} collectionName - Nome da coleção em que o documento está.
 * @param {string} directoryRepository - Diretório do repositório de dados.
 * @param {Record<CollectionName, FormatterCollection>} collectionFormatters - Formatters associados às coleções.
 * @returns {CollectionBeforeDeleteHook} Um hook a ser utilizado antes da deleção de um documento em uma coleção.
 */
export const beforeDeleteAndQueue = (
  collectionName: string,
  directoryRepository: string,
  collectionFormatters: Record<CollectionName, FormatterCollection>
): CollectionBeforeDeleteHook => {
  return async ({ req, id }) => {
    // Busca o documento que está prestes a ser deletado.
    const document = await payload.findByID({
      collection: collectionName,
      id: id,
    });

    // Adiciona o documento à fila para processamento posterior.
    addToQueue(
      collectionName,
      id,
      document,
      'delete',
      directoryRepository,
      collectionFormatters
    );
  };
};
