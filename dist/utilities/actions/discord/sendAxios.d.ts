import { EmbedData } from '../../../types';
/**
 * Envia uma mensagem para o Discord usando Axios.
 *
 * Esta função envia uma mensagem e, opcionalmente, um embed para um canal
 * do Discord, usando um webhook previamente definido.
 *
 * @async
 * @function
 * @param {string} message - Mensagem principal a ser enviada.
 * @param {string} [beforeMessage] - Mensagem a ser anexada antes da mensagem principal.
 * @param {EmbedData} [embed] - Dados embed para enviar junto com a mensagem.
 * @throws {Error} Se a URL do webhook não estiver definida ou se houver um erro ao enviar a mensagem.
 */
declare const sendAxios: (message: string, beforeMessage?: string, embed?: EmbedData) => Promise<void>;
export default sendAxios;
