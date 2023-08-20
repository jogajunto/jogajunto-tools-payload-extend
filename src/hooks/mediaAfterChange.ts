/**
 * Hook para lidar com doc que são apenas mídia com um nome/slug
 */
import { CollectionAfterChangeHook } from 'payload/types';
import { CollectionName } from '../types/CollectionName';

// Hook que sera executado após a alteração de um doc que representa somente uma media, para envio ao repositório do Github
export const mediaAfterChange = (
  collectionName: CollectionName, // Nome da coleção que está sendo modificada
  directory: string // Diretório que está sendo modificado
): CollectionAfterChangeHook => {
  return async ({
    doc, // Dados completos do documento
    req: { payload }, // Requisição completa do express, transformada em payload para operações de busca
    previousDoc, // Dados do documento antes de ser modificado
    operation, // Nome da operação, ex: 'create', 'update'
  }) => {
    console.log(doc);
    return doc;
  };
};
