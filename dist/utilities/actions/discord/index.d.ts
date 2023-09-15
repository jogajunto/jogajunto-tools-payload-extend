import { DiscordDataError, DiscordDataInfo } from '../../../types/discord';
/**
 * Envia uma mensagem de erro para o Discord.
 *
 * Esta função formata e envia mensagens de erro para um canal
 * do Discord usando um prefixo padrão e ícones específicos.
 *
 * @async
 * @function
 * @param {DiscordDataError} data - Dados relacionados ao erro para serem enviados ao Discord.
 */
declare const sendErrorDisc: (data: DiscordDataError) => Promise<void>;
/**
 * Envia uma mensagem informativa para o Discord.
 *
 * Esta função formata e envia mensagens informativas para um canal
 * do Discord usando um prefixo padrão e ícones específicos.
 *
 * @async
 * @function
 * @param {DiscordDataInfo} data - Dados informativos para serem enviados ao Discord.
 */
declare const sendInfoDisc: (data: DiscordDataInfo) => Promise<void>;
export { sendErrorDisc, sendInfoDisc };
