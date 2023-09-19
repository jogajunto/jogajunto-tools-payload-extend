"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processQueue = exports.sendOperationFromGithub = exports.getQueue = exports.removeFromQueue = exports.addToQueue = exports.itemIsInQueue = void 0;
const lodash_1 = __importDefault(require("lodash"));
const formatMarkdown_1 = __importDefault(require("../utilities/formatMarkdown"));
const payload_1 = __importDefault(require("payload"));
const sendAction_1 = __importDefault(require("../utilities/actions/github/sendAction"));
const DELAY_BETWEEN_REQUESTS = 9 * 1000; // 9 segundos
let queue = [];
let isProcessing = false; // Variável de controle
/**
 * Verifica se um item já está na fila com base no seu ID.
 *
 * @function
 * @param {string|number} id - O ID do item.
 * @returns {boolean} Retorna true se o item estiver na fila, caso contrário false.
 */
const itemIsInQueue = (id) => {
    return queue.some((item) => item.id === id);
};
exports.itemIsInQueue = itemIsInQueue;
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
const addToQueue = (collection, id, document, operation, directoryRepository, collectionFormatters) => {
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
        (0, exports.processQueue)();
    }
};
exports.addToQueue = addToQueue;
/**
 * Remove um item da fila com base no nome da coleção e ID.
 *
 * @function
 * @param {string} collection - Nome da coleção.
 * @param {string|number} id - ID do documento.
 */
const removeFromQueue = (collection, id) => {
    queue = queue.filter((item) => item.collection !== collection || item.id !== id);
    console.log('removeFromQueue > queue', queue);
};
exports.removeFromQueue = removeFromQueue;
/**
 * Retorna os itens atualmente na fila.
 *
 * @function
 * @returns {QueueItem[]} - Lista de itens na fila.
 */
const getQueue = () => {
    return queue;
};
exports.getQueue = getQueue;
/**
 * Prepara e envia a operação para o GitHub, formatando o documento em markdown se necessário.
 *
 * @function
 * @param {QueueItem} task - Tarefa a ser processada.
 */
const sendOperationFromGithub = async (task) => {
    // Formata o documento para markdown
    const markdownFile = task.operation !== 'delete'
        ? await (0, formatMarkdown_1.default)(task.document, task.collection, payload_1.default, task.collectionFormatters)
        : '';
    const data = {
        event_type: task.operation,
        client_payload: {
            slug: task.document.slug,
            operation: task.operation,
            directory: task.directoryRepository,
            content: markdownFile != '' ? lodash_1.default.trim(markdownFile, '\n') : '',
        },
    };
    console.log('sendAction(data)', data);
    await (0, sendAction_1.default)(data);
};
exports.sendOperationFromGithub = sendOperationFromGithub;
/**
 * Processa os itens na fila sequencialmente.
 *
 * @function
 */
const processQueue = async () => {
    try {
        if (queue.length === 0) {
            console.log('Fila está vazia. Saindo do processQueue.');
            return;
        }
        const task = queue[0];
        console.log('Processando documento da fila:', task.document.id || task.document.slug);
        // Realize a deleção no GitHub aqui
        await (0, exports.sendOperationFromGithub)(task);
        console.log('FAKE - Enviando para o Github', task.document.id);
        // Emular algum processamento ou chamar a função real aqui
        await new Promise((resolve) => setTimeout(resolve, 1000));
        (0, exports.removeFromQueue)(task.collection, task.id);
        if (queue.length > 0) {
            console.log('Ainda há itens na fila. Definindo novo tempo para processar o próximo item.');
            setTimeout(exports.processQueue, DELAY_BETWEEN_REQUESTS);
        }
        else {
            console.log('Todos os itens processados. Fila limpa.');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Erro durante o processo de execussão da fila:', error.message);
        }
        else {
            console.error('Erro durante o processo de execussão da fila:', error);
        }
        throw error;
    }
};
exports.processQueue = processQueue;
