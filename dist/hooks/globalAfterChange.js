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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalAfterChange = void 0;
// Importações necessárias
var lodash_1 = __importDefault(require("lodash"));
var formatMarkdown_1 = __importDefault(require("../utilities/formatMarkdown"));
var sendAction_1 = __importDefault(require("../utilities/actions/github/sendAction"));
// Hook que será executado depois que um documento for alterado
var globalAfterChange = function (collectionName, // Nome da coleção que está sendo modificada
directory, // Diretório que está sendo modificado
collectionFormatters, // Objeto com as funções de preparação para cada collections formatar seu markdown
collectionUploadName, // Nome da colleção para o upload de imagem que esta sendo relacionada
directoryImage // Imagem do diretório, se houver
) {
    return function (_a) {
        var doc = _a.doc, payload = _a.req.payload, // Requisição completa do express, transformada em payload para operações de busca
        previousDoc = _a.previousDoc, // Dados do documento antes de ser modificado
        operation = _a.operation;
        return __awaiter(void 0, void 0, void 0, function () {
            var oldDoc, newDoc, image, updateImage, markdownFile, data, url, parts, filename, filenameParts, extension, nameWithoutExtension;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(operation === 'update' || operation === 'create')) return [3 /*break*/, 5];
                        oldDoc = lodash_1.default.omit(previousDoc, ['_id', '__v', 'updatedAt']);
                        newDoc = lodash_1.default.omit(doc, ['updatedAt']);
                        image = null;
                        if (!(newDoc.image &&
                            collectionUploadName != null &&
                            collectionUploadName != undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, payload.findByID({
                                collection: collectionUploadName,
                                id: newDoc.image,
                            })];
                    case 1:
                        image = _b.sent();
                        _b.label = 2;
                    case 2:
                        updateImage = false;
                        if (!!lodash_1.default.isEqual(newDoc, oldDoc)) return [3 /*break*/, 4];
                        console.log('The document was changed.');
                        return [4 /*yield*/, (0, formatMarkdown_1.default)(doc, collectionName, payload, collectionFormatters)];
                    case 3:
                        markdownFile = _b.sent();
                        // Verifica se a imagem foi alterada
                        if (oldDoc.image || newDoc.image) {
                            if (newDoc.image !== oldDoc.image) {
                                updateImage = true;
                            }
                        }
                        data = {
                            event_type: operation,
                            client_payload: {
                                slug: doc.slug,
                                operation: operation,
                                directory: directory,
                                content: lodash_1.default.trim(markdownFile, '\n'),
                            },
                        };
                        if (updateImage && directoryImage && image.url) {
                            // Adiciona a imagem à payload do cliente
                            data.client_payload.image = image.url;
                            url = image.url;
                            parts = url.split('/');
                            filename = parts[parts.length - 1];
                            filenameParts = filename.split('.');
                            extension = filenameParts.pop();
                            if (extension) {
                                data.client_payload.image_extension = extension;
                            }
                            nameWithoutExtension = filenameParts.join('.');
                            if (nameWithoutExtension) {
                                data.client_payload.image_filename = nameWithoutExtension;
                            }
                            data.client_payload.directory_image = directoryImage;
                        }
                        // Envia para o Github Actions
                        (0, sendAction_1.default)(data);
                        return [3 /*break*/, 5];
                    case 4:
                        // Log que o documento não teve alterações
                        console.log('The document was not changed.');
                        _b.label = 5;
                    case 5: 
                    // Retorna o documento modificado
                    return [2 /*return*/, doc];
                }
            });
        });
    };
};
exports.globalAfterChange = globalAfterChange;
