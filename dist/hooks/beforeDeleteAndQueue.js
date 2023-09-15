"use strict";
/**
 * @module hooks/beforeDeleteAndQueue
 * @description Este módulo fornece um hook para ser utilizado antes da deleção de um
 * documento em uma coleção no Payload CMS. O hook permite adicionar o documento a uma
 * fila para processamento posterior, o que é útil para casos em que ações adicionais
 * devem ser executadas após a deleção de um documento, como notificações, logs ou
 * operações em outros sistemas.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeDeleteAndQueue = void 0;
const payload_1 = __importDefault(require("payload"));
const queueManagerMemory_1 = require("../queue/queueManagerMemory");
/**
 * Função que é executada antes da deleção de um documento em uma coleção.
 * Quando um documento é deletado, ele é adicionado a uma fila para processamento posterior.
 *
 * @param {string} collectionName - Nome da coleção em que o documento está.
 * @param {string} directoryRepository - Diretório do repositório de dados.
 * @param {Record<CollectionName, FormatterCollection>} collectionFormatters - Formatters associados às coleções.
 * @returns {CollectionBeforeDeleteHook} Um hook a ser utilizado antes da deleção de um documento em uma coleção.
 */
const beforeDeleteAndQueue = (collectionName, directoryRepository, collectionFormatters) => {
    return async ({ req, id }) => {
        // Busca o documento que está prestes a ser deletado.
        const document = await payload_1.default.findByID({
            collection: collectionName,
            id: id,
        });
        // Adiciona o documento à fila para processamento posterior.
        (0, queueManagerMemory_1.addToQueue)(collectionName, id, document, 'delete', directoryRepository, collectionFormatters);
    };
};
exports.beforeDeleteAndQueue = beforeDeleteAndQueue;
