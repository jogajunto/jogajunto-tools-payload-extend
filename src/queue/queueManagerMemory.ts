// queueManager.ts
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

export const itemIsInQueue = (id: string | number): boolean => {
  return queue.some((item) => item.id === id);
};

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

export const removeFromQueue = (
  collection: string,
  id: string | number
): void => {
  queue = queue.filter(
    (item) => item.collection !== collection || item.id !== id
  );
  console.log('removeFromQueue > queue', queue);
};

export const getQueue = (): QueueItem[] => {
  return queue;
};

export const sendOperationFromGithub = async (task: QueueItem) => {
  console.log('Task antes de formatMarkdown:', task);
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
  console.log('Markdown resultante:', markdownFile);
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
