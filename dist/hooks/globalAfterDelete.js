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
const sendAction_1 = __importDefault(require("../utilities/actions/github/sendAction"));
const globalAfterDelete = (collectionName, // Nome da coleção que está sendo modificada
directory // Diretório que está sendo modificado
) => {
    return ({ doc }) => __awaiter(void 0, void 0, void 0, function* () {
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
    });
};
// Exporta o hook
exports.default = globalAfterDelete;
