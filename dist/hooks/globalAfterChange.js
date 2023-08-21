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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalAfterChange = void 0;
// Importações necessárias
const lodash_1 = __importDefault(require("lodash"));
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
    return ({ doc, // Dados completos do documento
    req: { payload }, // Requisição completa do express, transformada em payload para operações de busca
    previousDoc, // Dados do documento antes de ser modificado
    operation, // Nome da operação, ex: 'create', 'update'
     }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Verifica se a operação é de criação ou atualização
            if (operation === 'update' || operation === 'create') {
                // Remove campos desnecessários dos documentos antigo e novo
                let oldDoc = lodash_1.default.omit(previousDoc, ['_id', '__v', 'updatedAt']);
                let newDoc = lodash_1.default.omit(doc, ['updatedAt']);
                // Inicia a variavel null para se não existir newDoc.image
                let image = null;
                // Pega a imagem de começo pois vai ser utlizada em varias partes
                if (newDoc.image &&
                    collectionUploadName != null &&
                    collectionUploadName != undefined) {
                    image = yield payload.findByID({
                        collection: collectionUploadName,
                        id: newDoc.image,
                    });
                }
                // Variável para verificar se a imagem foi atualizada
                let updateImage = false;
                // Verifica se o documento foi alterado
                if (!lodash_1.default.isEqual(newDoc, oldDoc)) {
                    console.log('The document was changed.');
                    // Formata o documento para markdown
                    const markdownFile = yield (0, formatMarkdown_1.default)(doc, collectionName, payload, collectionFormatters);
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
                        data = yield (0, prepareImageForRepository_1.default)(data, directoryImage, image);
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
            console.error('Erro durante o processo de alteração global:', error.message);
            // Dependendo do que você deseja fazer quando um erro ocorre, você pode:
            // 1. Rethrow o erro se desejar que ele seja tratado por um manipulador de erros de nível superior
            // throw error;
            // 2. Retornar uma resposta de erro ou algum valor padrão
            // return { error: "Houve um erro durante o processo." };
            // 3. Ou simplesmente registrar o erro e continuar a execução (já feito acima com console.error)
        }
    });
};
exports.globalAfterChange = globalAfterChange;
