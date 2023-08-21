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
const prepareImageForRepository = (data, directoryImage, image) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Adiciona a imagem à payload do cliente
        data.client_payload.image = image.url;
        const url = image.url;
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        const filenameParts = filename.split('.');
        const extension = filenameParts.pop(); // Remove a extensão
        if (extension) {
            data.client_payload.image_extension = extension;
        }
        const nameWithoutExtension = filenameParts.join('.'); // Junta o resto sem a extensão
        if (nameWithoutExtension) {
            data.client_payload.image_filename = nameWithoutExtension;
        }
        data.client_payload.directory_image = directoryImage;
        return data;
    }
    catch (error) {
        /* Tratamento de erro em prepareImageForRepository */
        console.error('Erro ao preparar a imagem para o repositório:', error.message);
        throw error;
    }
});
exports.default = prepareImageForRepository;
