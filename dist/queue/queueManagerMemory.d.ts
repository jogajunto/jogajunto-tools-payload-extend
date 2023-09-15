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
import { Document } from 'payload/types';
import { CollectionName, FormatterCollection, QueueItem } from '../types';
/**
 * Verifica se um item já está na fila com base no seu ID.
 *
 * @function
 * @param {string|number} id - O ID do item.
 * @returns {boolean} Retorna true se o item estiver na fila, caso contrário false.
 */
export declare const itemIsInQueue: (id: string | number) => boolean;
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
export declare const addToQueue: (collection: string, id: string | number, document: Document, operation: 'delete' | 'create' | 'update', directoryRepository: string, collectionFormatters: Record<CollectionName, FormatterCollection>) => void;
/**
 * Remove um item da fila com base no nome da coleção e ID.
 *
 * @function
 * @param {string} collection - Nome da coleção.
 * @param {string|number} id - ID do documento.
 */
export declare const removeFromQueue: (collection: string, id: string | number) => void;
/**
 * Retorna os itens atualmente na fila.
 *
 * @function
 * @returns {QueueItem[]} - Lista de itens na fila.
 */
export declare const getQueue: () => QueueItem[];
/**
 * Prepara e envia a operação para o GitHub, formatando o documento em markdown se necessário.
 *
 * @function
 * @param {QueueItem} task - Tarefa a ser processada.
 */
export declare const sendOperationFromGithub: (task: QueueItem) => Promise<void>;
/**
 * Processa os itens na fila sequencialmente.
 *
 * @function
 */
export declare const processQueue: () => Promise<void>;
