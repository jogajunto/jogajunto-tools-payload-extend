"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaAfterChange = void 0;
// Hook que sera executado após a alteração de um doc que representa somente uma media, para envio ao repositório do Github
const mediaAfterChange = (collectionName, // Nome da coleção que está sendo modificada
directory // Diretório que está sendo modificado
) => {
    return ({ doc, // Dados completos do documento
    req: { payload }, // Requisição completa do express, transformada em payload para operações de busca
    previousDoc, // Dados do documento antes de ser modificado
    operation, // Nome da operação, ex: 'create', 'update'
     }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(doc);
        return doc;
    });
};
exports.mediaAfterChange = mediaAfterChange;
