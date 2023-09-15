/**
 * @module queueManagerMemory
 * @description Este módulo gerencia uma fila de operações em memória que precisam ser processadas e enviadas para o GitHub.
 * O principal objetivo é garantir que as operações sejam processadas sequencialmente, e que não sobrecarreguem 
 * os serviços com muitas solicitações simultâneas.
 *
 * Principais características:
 * - Adiciona operações (criar, atualizar, excluir) à fila.
 * - Remove operações da fila.
 * - Recupera os itens atualmente na fila.
 * - Envia operações ao GitHub, formatando os documentos para markdown quando necessário.
 * - Processa a fila sequencialmente, com um atraso entre as solicitações para evitar excesso de chamadas.
 * 
 * Esse módulo ajuda a assegurar que as operações no Payload CMS sejam refletidas no GitHub de maneira ordenada e eficiente, 
 * reduzindo a chance de conflitos e erros.
 */

import _ from 'lodash';
import { Document } from 'payload/types';
import {
  CollectionName,
  FormatterCollection,
  GitData,
  QueueItem,
} from '../types';
import formatMarkdown from '../utilities/formatMarkdown';
import payload from 'payload';
import sendAction from '../utilities/actions/github/sendAction';

const DELAY_BETWEEN_REQUESTS = 9 * 1000; // 9 segundos
let queue: QueueItem[] = [];
let isProcessing = false; // Variável de controle

/**
 * Verifica se um item já está na fila com base no seu ID.
 *
 * @function
 * @param {string|number} id - O ID do item.
 * @returns {boolean} Retorna true se o item estiver na fila, caso contrário false.
 */
export const itemIsInQueue = (id: string | number): boolean => {
  return queue.some((item) => item.id === id);
};

/**
 * Adiciona um item à fila e inicia o processamento se a fila estava vazia.
 *
 * @function
 * @param {string} collection - Nome da coleção.
 * @param {string|number} id - ID do documento.
 * @param {Document} document - O documento em si.
 * @param {'delete'|'create'|'update'} operation - Tipo de operação.
 * @param {string} directoryRepository - Diretório do repositório.
 * @param {Record<CollectionName, FormatterCollection>} collectionFormatters - Formatadores da coleção.
 */
export const addToQueue = (
  collection: string,
  id: string | number,
  document: Document,
  operation: 'delete' | 'create' | 'update',
  directoryRepository: string,
  collectionFormatters: Record<CollectionName, FormatterCollection>
): void => {
  const wasEmpty = queue.length === 0;
  queue.push({
    collection,
    id,
    document,
    operation,
    directoryRepository,
    collectionFormatters,
  });

  if (wasEmpty && !isProcessing) {
    processQueue();
  }
};

/**
 * Remove um item da fila com base no nome da coleção e ID.
 *
 * @function
 * @param {string} collection - Nome da coleção.
 * @param {string|number} id - ID do documento.
 */
export const removeFromQueue = (
  collection: string,
  id: string | number
): void => {
  queue = queue.filter(
    (item) => item.collection !== collection || item.id !== id
  );
  console.log('removeFromQueue > queue', queue);
};

/**
 * Retorna os itens atualmente na fila.
 *
 * @function
 * @returns {QueueItem[]} - Lista de itens na fila.
 */
export const getQueue = (): QueueItem[] => {
  return queue;
};

/**
 * Prepara e envia a operação para o GitHub, formatando o documento em markdown se necessário.
 *
 * @function
 * @param {QueueItem} task - Tarefa a ser processada.
 */
export const sendOperationFromGithub = async (task: QueueItem) => {
  // Formata o documento para markdown
  const markdownFile =
    task.operation !== 'delete'
      ? await formatMarkdown(
          task.document,
          task.collection,
          payload,
          task.collectionFormatters
        )
      : '';
  const data: GitData = {
    event_type: task.operation,
    client_payload: {
      slug: task.document.slug,
      operation: task.operation,
      directory: task.directoryRepository,
      content: markdownFile != '' ? _.trim(markdownFile, '\n') : '',
    },
  };
  console.log('sendAction(data)', data);
  await sendAction(data);
};

/**
 * Processa os itens na fila sequencialmente.
 *
 * @function
 */
export const processQueue = async () => {
  try {
    if (queue.length === 0) {
      console.log('Fila está vazia. Saindo do processQueue.');
      return;
    }

    const task: QueueItem = queue[0];
    console.log(
      'Processando documento da fila:',
      task.document.id || task.document.slug
    );

    // Realize a deleção no GitHub aqui
    await sendOperationFromGithub(task);

    console.log('FAKE - Enviando para o Github', task.document.id);

    // Emular algum processamento ou chamar a função real aqui
    await new Promise((resolve) => setTimeout(resolve, 1000));
    removeFromQueue(task.collection, task.id);

    if (queue.length > 0) {
      console.log(
        'Ainda há itens na fila. Definindo novo tempo para processar o próximo item.'
      );
      setTimeout(processQueue, DELAY_BETWEEN_REQUESTS);
    } else {
      console.log('Todos os itens processados. Fila limpa.');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        'Erro durante o processo de execussão da fila:',
        error.message
      );
    } else {
      console.error('Erro durante o processo de execussão da fila:', error);
    }
  }
};
