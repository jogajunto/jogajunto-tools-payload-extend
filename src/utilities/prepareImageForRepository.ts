/**
 * @module utilities/prepareImageForRepository
 * @description Prepara uma imagem para ser adicionada ao repositório.
 */

import { GitData } from '../types';

/**
 * Valida e corrige a URL para garantir que seus componentes estejam corretamente codificados.
 * 
 * @param {string} url - A URL da imagem.
 * @returns {string} Retorna a URL corrigida.
 */
const validateAndCorrectURL = (url: string): string => {
  // Usa a função 'encodeURIComponent' para codificar apenas os componentes da URL
  const urlParts = url.split('/');
  const lastPart = urlParts.pop() || '';
  const lastPartEncoded = encodeURIComponent(lastPart);

  // Junta a URL novamente
  const correctedURL = [...urlParts, lastPartEncoded].join('/');

  return correctedURL;
};

/**
 * Prepara uma imagem para ser adicionada ao payload do cliente e retorna a estrutura de dados atualizada.
 * 
 * @param {GitData} data - Os dados iniciais do cliente.
 * @param {string} directoryImage - O diretório onde a imagem será armazenada.
 * @param {any} image - Os dados da imagem a ser adicionada.
 * @returns {Promise<GitData>} Retorna a estrutura de dados atualizada.
 */
const prepareImageForRepository = async (
  data: GitData,
  directoryImage: string,
  image: any
) => {
  try {
    // Adiciona a imagem à payload do cliente
    data.client_payload.image = validateAndCorrectURL(image.url);
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
  } catch (error) {
    /* Tratamento de erro em prepareImageForRepository */
    if (error instanceof Error) {
      console.error(
        'Erro ao preparar a imagem para o repositório:',
        error.message
      );
    } else {
      console.error('Erro ao preparar a imagem para o repositório:', error);
    }
    throw error;
  }
};

export default prepareImageForRepository;
