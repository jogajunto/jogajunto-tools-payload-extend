/**
 * @module hooks/globalAfterChange
 * @description Este módulo fornece um hook que é executado após qualquer
 * mudança em um documento no Payload CMS. Este hook é responsável por
 * comparar o documento atual com o anterior, formatá-lo para markdown (se
 * houver alguma mudança), preparar a imagem (se atualizada) e, finalmente,
 * enviar os dados formatados para as Github Actions.
 *
 * As funcionalidades principais incluem:
 * 1. Comparar o documento anterior e o atual.
 * 2. Formatar o documento em markdown.
 * 3. Preparar a imagem para o repositório.
 * 4. Enviar informações formatadas para as Github Actions.
 */

import _, { isString } from 'lodash';
import { CollectionAfterChangeHook } from 'payload/types';
import { FormatterCollection, GitData } from '../types';
import sendAction from '../utilities/actions/github/sendAction';
import { CollectionName } from '../types/CollectionName';
import prepareImageForRepository from '../utilities/prepareImageForRepository';
import formatMarkdownV2 from '../utilities/formatMarkdownV2';

/**
 * Hook para ser executado após qualquer mudança em um documento. Este hook
 * compara o documento atual com o anterior, formata para markdown se houver
 * alguma mudança, prepara a imagem se for atualizada e envia os dados
 * formatados para as Github Actions.
 *
 * @param {CollectionName} collectionName - Nome da coleção que está sendo modificada.
 * @param {string} directory - Diretório que está sendo modificado.
 * @param {Record<CollectionName, FormatterCollection>} collectionFormatters - Objeto com as funções para formatar o markdown para cada coleção.
 * @param {CollectionName} collectionUploadName - (Opcional) Nome da coleção para o upload de imagem que está sendo relacionada.
 * @param {string} directoryImage - (Opcional) Caminho do diretório da imagem.
 * @returns {CollectionAfterChangeHook} Hook para ser usado após uma mudança.
 */
export const globalAfterChange = (
  collectionName: CollectionName, // Nome da coleção que está sendo modificada
  directory: string, // Diretório que está sendo modificado
  collectionFormatters: Record<CollectionName, FormatterCollection>, // Objeto com as funções de preparação para cada collections formatar seu markdown
  collectionUploadName?: CollectionName, // Nome da colleção para o upload de imagem que esta sendo relacionada
  directoryImage?: string // Imagem do diretório, se houver
): CollectionAfterChangeHook => {
  return async ({
    doc, // Dados completos do documento
    req: { payload, payloadAPI }, // Requisição completa do express, transformada em payload para operações de busca
    previousDoc, // Dados do documento antes de ser modificado
    operation, // Nome da operação, ex: 'create', 'update'
  }) => {
    try {
      let preserveDocForReturn: any = doc;
      // Verifica se a operação é de criação ou atualização
      if (
        payloadAPI !== 'local' &&
        (operation === 'update' || operation === 'create')
      ) {
        // Remove campos desnecessários dos documentos antigo e novo
        let oldDoc = _.omit(previousDoc, ['_id', '__v', 'updatedAt']);
        let newDoc = _.omit(doc, ['updatedAt']);

        // Transforma a propriedade 'image' do newDoc em uma string
        if (
          newDoc.image &&
          typeof newDoc.image === 'object' &&
          newDoc.image.id
        ) {
          newDoc.image = newDoc.image.id;
        }

        // Verifica se o documento foi alterado
        if (!_.isEqual(newDoc, oldDoc)) {
          console.log('The document was changed.');

          // Inicia a variavel null para se não existir newDoc.image
          let image: any = null;

          // Pega a imagem de começo pois vai ser utlizada em varias partes
          if (
            newDoc.image &&
            collectionUploadName != null &&
            collectionUploadName != undefined
          ) {
            // Asegure-se de que você está pegando apenas o ID da imagem e não o objeto completo.
            const imageId =
              typeof newDoc.image === 'object' ? newDoc.image.id : newDoc.image;

            image = await payload.findByID({
              collection: collectionUploadName,
              id: imageId,
            });
          }

          // Variável para verificar se a imagem foi atualizada
          let updateImage = false;

          // Formata o documento para markdown
          const markdownFile = await formatMarkdownV2(
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
          let data: GitData = {
            event_type: operation,
            client_payload: {
              slug: doc.slug,
              operation: operation,
              directory: directory,
              content: _.trim(markdownFile, '\n'),
            },
          };

          if (updateImage && directoryImage && image?.url) {
            data = await prepareImageForRepository(data, directoryImage, image);
          }

          // Envia para o Github Actions
          sendAction(data);
        } else {
          // Log que o documento não teve alterações
          console.log('The document was not changed.');
        }
      }

      // Retorna o documento modificado
      return preserveDocForReturn;
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          'Erro durante o processo de alteração global:',
          error.message
        );
      } else {
        console.error('Erro durante o processo de alteração global:', error);
      }
      throw error;
      // Dependendo do que você deseja fazer quando um erro ocorre, você pode:
      // 1. Rethrow o erro se desejar que ele seja tratado por um manipulador de erros de nível superior
      // throw error;
      // 2. Retornar uma resposta de erro ou algum valor padrão
      // return { error: "Houve um erro durante o processo." };
      // 3. Ou simplesmente registrar o erro e continuar a execução (já feito acima com console.error)
    }
  };
};
