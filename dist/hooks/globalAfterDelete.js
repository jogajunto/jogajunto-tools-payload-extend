"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalAfterDelete = void 0;
const sendAction_1 = __importDefault(require("../utilities/actions/github/sendAction"));
const globalAfterDelete = (collectionName, // Nome da coleção que está sendo modificada
directory // Diretório que está sendo modificado
) => {
    return async ({ doc }) => {
        // Prepara os dados para enviar para a Github Action
        const data = {
            event_type: 'delete',
            client_payload: {
                slug: doc.slug,
                operation: 'delete',
                directory: directory,
                content: '',
            },
        };
        // Envia para o Github Actions
        (0, sendAction_1.default)(data);
        // Retorna o documento excluído
        return doc;
    };
};
exports.globalAfterDelete = globalAfterDelete;
