"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalAfterChange = void 0;
// Importações necessárias
const lodash_1 = __importStar(require("lodash"));
const formatMarkdown_1 = __importDefault(require("../utilities/formatMarkdown"));
const sendAction_1 = __importDefault(require("../utilities/actions/github/sendAction"));
const prepareImageForRepository_1 = __importDefault(require("../utilities/prepareImageForRepository"));
// Hook que será executado depois que um documento for alterado
const globalAfterChange = (collectionName, // Nome da coleção que está sendo modificada
directory, // Diretório que está sendo modificado
collectionFormatters, // Objeto com as funções de preparação para cada collections formatar seu markdown
collectionUploadName, // Nome da colleção para o upload de imagem que esta sendo relacionada
directoryImage // Imagem do diretório, se houver
) => {
    return async ({ doc, // Dados completos do documento
    req: { payload }, // Requisição completa do express, transformada em payload para operações de busca
    previousDoc, // Dados do documento antes de ser modificado
    operation, // Nome da operação, ex: 'create', 'update'
     }) => {
        try {
            // Verifica se a operação é de criação ou atualização
            if (operation === 'update' || operation === 'create') {
                // Remove campos desnecessários dos documentos antigo e novo
                let oldDoc = lodash_1.default.omit(previousDoc, ['_id', '__v', 'updatedAt']);
                let newDoc = lodash_1.default.omit(doc, ['updatedAt']);
                // Inicia a variavel null para se não existir newDoc.image
                let image = null;
                // Inicia o id da image
                let idImage = '';
                // Pega a imagem de começo pois vai ser utlizada em varias partes
                if (newDoc.image && (0, lodash_1.isString)(newDoc.image)) {
                    idImage = newDoc.image;
                }
                else if (newDoc.image && !(0, lodash_1.isString)(newDoc.image)) {
                    idImage = newDoc.image.id;
                }
                if (idImage != '' &&
                    collectionUploadName != null &&
                    collectionUploadName != undefined) {
                    image = await payload.findByID({
                        collection: collectionUploadName,
                        id: idImage,
                    });
                }
                // Variável para verificar se a imagem foi atualizada
                let updateImage = false;
                // Verifica se o documento foi alterado
                if (!lodash_1.default.isEqual(newDoc, oldDoc)) {
                    console.log('The document was changed.');
                    // Formata o documento para markdown
                    const markdownFile = await (0, formatMarkdown_1.default)(doc, collectionName, payload, collectionFormatters);
                    // Verifica se a imagem foi alterada
                    if (oldDoc.image || newDoc.image) {
                        if (newDoc.image !== oldDoc.image) {
                            updateImage = true;
                        }
                    }
                    // Prepara os dados para enviar para a Github Action
                    let data = {
                        event_type: operation,
                        client_payload: {
                            slug: doc.slug,
                            operation: operation,
                            directory: directory,
                            content: lodash_1.default.trim(markdownFile, '\n'),
                        },
                    };
                    if (updateImage && directoryImage && image.url) {
                        data = await (0, prepareImageForRepository_1.default)(data, directoryImage, image);
                    }
                    // Envia para o Github Actions
                    (0, sendAction_1.default)(data);
                }
                else {
                    // Log que o documento não teve alterações
                    console.log('The document was not changed.');
                }
            }
            // Retorna o documento modificado
            return doc;
        }
        catch (error) {
            let message;
            if (error instanceof Error) {
                console.error('Erro durante o processo de alteração global:', error.message);
                message = error.message;
            }
            else {
                console.error('Erro durante o processo de alteração global:', error);
                message = 'Erro durante o processo de alteração global';
            }
            throw message;
            // Dependendo do que você deseja fazer quando um erro ocorre, você pode:
            // 1. Rethrow o erro se desejar que ele seja tratado por um manipulador de erros de nível superior
            // throw error;
            // 2. Retornar uma resposta de erro ou algum valor padrão
            // return { error: "Houve um erro durante o processo." };
            // 3. Ou simplesmente registrar o erro e continuar a execução (já feito acima com console.error)
        }
    };
};
exports.globalAfterChange = globalAfterChange;
