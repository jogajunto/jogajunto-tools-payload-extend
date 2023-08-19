// Importações necessárias
import _ from 'lodash';
import { CollectionAfterChangeHook } from 'payload/types';
import formatMarkdown from '../utilities/formatMarkdown';
import { GitData, ImageType } from '../types';
import sendAction from '../utilities/actions/github/sendAction';
import { CollectionName } from '../types/CollectionName';

// Hook que será executado depois que um documento for alterado
const globalAfterChange = (
  collectionName: CollectionName, // Nome da coleção que está sendo modificada
  directory: string, // Diretório que está sendo modificado
  collectionFormatters: Object, // Objeto com as funções de preparação para cada collections formatar seu markdown
  collectionUploadName?: CollectionName, // Nome da colleção para o upload de imagem que esta sendo relacionada
  directoryImage?: string // Imagem do diretório, se houver
): CollectionAfterChangeHook => {
  return async ({
    doc, // Dados completos do documento
    req: { payload }, // Requisição completa do express, transformada em payload para operações de busca
    previousDoc, // Dados do documento antes de ser modificado
    operation, // Nome da operação, ex: 'create', 'update'
  }) => {
    // Verifica se a operação é de criação ou atualização
    if (operation === 'update' || operation === 'create') {
      // Remove campos desnecessários dos documentos antigo e novo
      let oldDoc = _.omit(previousDoc, ['_id', '__v', 'updatedAt']);
      let newDoc = _.omit(doc, ['updatedAt']);

      // Inicia a variavel null para se não existir newDoc.image
      let image: ImageType | any = null;

      // Pega a imagem de começo pois vai ser utlizada em varias partes
      if (
        newDoc.image &&
        collectionUploadName != null &&
        collectionUploadName != undefined
      ) {
        image = await payload.findByID({
          collection: collectionUploadName,
          id: newDoc.image,
        });
      }

      // Variável para verificar se a imagem foi atualizada
      let updateImage = false;

      // Verifica se o documento foi alterado
      if (!_.isEqual(newDoc, oldDoc)) {
        console.log('The document was changed.');

        // Formata o documento para markdown
        const markdownFile = await formatMarkdown(
          doc,
          collectionName,
          payload,
          collectionFormatters
        );

        // Verifica se a imagem foi alterada
        if (oldDoc.image || newDoc.image) {
          if (newDoc.image !== oldDoc.image) {
            updateImage = true;
          }
        }

        // Prepara os dados para enviar para a Github Action
        const data: GitData = {
          event_type: operation,
          client_payload: {
            slug: doc.slug,
            operation: operation,
            directory: directory,
            content: _.trim(markdownFile, '\n'),
          },
        };

        if (updateImage && directoryImage && image.url) {
          // Adiciona a imagem à payload do cliente
          data.client_payload.image = image.url;
          const url = image.url;
          const parts = url.split('/');
          const filename = parts[parts.length - 1];
          const filenameParts = filename.split('.');
          const extension = filenameParts.pop(); // Remove a extensão

          if (extension) {
            data.client_payload.image_extension = extension;
          }

          const nameWithoutExtension = filenameParts.join('.'); // Junta o resto sem a extensão

          if (nameWithoutExtension) {
            data.client_payload.image_filename = nameWithoutExtension;
          }

          data.client_payload.directory_image = directoryImage;
        }

        // Envia para o Github Actions
        sendAction(data);
      } else {
        // Log que o documento não teve alterações
        console.log('The document was not changed.');
      }
    }

    // Retorna o documento modificado
    return doc;
  };
};

// Exporta o hook
export default globalAfterChange;
