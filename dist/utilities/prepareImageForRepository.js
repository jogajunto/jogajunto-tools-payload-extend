"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateAndCorrectURL = (url) => {
    // Usa a função 'encodeURIComponent' para codificar apenas os componentes da URL
    const urlParts = url.split('/');
    const lastPart = urlParts.pop() || '';
    const lastPartEncoded = encodeURIComponent(lastPart);
    // Junta a URL novamente
    const correctedURL = [...urlParts, lastPartEncoded].join('/');
    return correctedURL;
};
const prepareImageForRepository = async (data, directoryImage, image) => {
    try {
        // Adiciona a imagem à payload do cliente
        data.client_payload.image = validateAndCorrectURL(image.url);
        console.log('data.client_payload.image', data.client_payload.image);
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
        if (error instanceof Error) {
            console.error('Erro ao preparar a imagem para o repositório:', error.message);
        }
        else {
            console.error('Erro ao preparar a imagem para o repositório:', error);
        }
        throw error;
    }
};
exports.default = prepareImageForRepository;
