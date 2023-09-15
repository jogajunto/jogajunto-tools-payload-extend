/**
 * @module utilities/prepareImageForRepository
 * @description Prepara uma imagem para ser adicionada ao repositório.
 */
import { GitData, ImageType } from '../types';
/**
 * Prepara uma imagem para ser adicionada ao payload do cliente e retorna a estrutura de dados atualizada.
 *
 * @param {GitData} data - Os dados iniciais do cliente.
 * @param {string} directoryImage - O diretório onde a imagem será armazenada.
 * @param {ImageType} image - Os dados da imagem a ser adicionada.
 * @returns {Promise<GitData>} Retorna a estrutura de dados atualizada.
 */
declare const prepareImageForRepository: (data: GitData, directoryImage: string, image: ImageType) => Promise<GitData>;
export default prepareImageForRepository;
