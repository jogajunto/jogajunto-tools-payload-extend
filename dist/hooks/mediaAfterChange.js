"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaAfterChange = void 0;
// Hook que sera executado após a alteração de um doc que representa somente uma media, para envio ao repositório do Github
const mediaAfterChange = (collectionName, // Nome da coleção que está sendo modificada
directory // Diretório que está sendo modificado
) => {
    return async ({ doc, // Dados completos do documento
    req: { payload }, // Requisição completa do express, transformada em payload para operações de busca
    previousDoc, // Dados do documento antes de ser modificado
    operation, // Nome da operação, ex: 'create', 'update'
     }) => {
        console.log(doc);
        return doc;
    };
};
exports.mediaAfterChange = mediaAfterChange;
