"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processQueue = exports.sendOperationFromGithub = exports.getQueue = exports.removeFromQueue = exports.addToQueue = exports.itemIsInQueue = void 0;
// queueManager.ts
const lodash_1 = __importDefault(require("lodash"));
const formatMarkdown_1 = __importDefault(require("../utilities/formatMarkdown"));
const payload_1 = __importDefault(require("payload"));
const sendAction_1 = __importDefault(require("../utilities/actions/github/sendAction"));
const DELAY_BETWEEN_REQUESTS = 9 * 1000; // 9 segundos
let queue = [];
let isProcessing = false; // Variável de controle
const itemIsInQueue = (id) => {
    return queue.some((item) => item.id === id);
};
exports.itemIsInQueue = itemIsInQueue;
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
const removeFromQueue = (collection, id) => {
    queue = queue.filter((item) => item.collection !== collection || item.id !== id);
    console.log('removeFromQueue > queue', queue);
};
exports.removeFromQueue = removeFromQueue;
const getQueue = () => {
    return queue;
};
exports.getQueue = getQueue;
const sendOperationFromGithub = async (task) => {
    console.log('Task antes de formatMarkdown:', task);
    // Formata o documento para markdown
    const markdownFile = task.operation !== 'delete'
        ? await (0, formatMarkdown_1.default)(task.document, task.collection, payload_1.default, task.collectionFormatters)
        : '';
    console.log('Markdown resultante:', markdownFile);
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
    }
};
exports.processQueue = processQueue;
