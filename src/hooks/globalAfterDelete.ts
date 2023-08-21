import { CollectionAfterDeleteHook } from 'payload/types';
import { GitData } from '../types';
import sendAction from '../utilities/actions/github/sendAction';

export const globalAfterDelete = (
  collectionName: string, // Nome da coleção que está sendo modificada
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
