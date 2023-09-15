import { DiscordDataError, DiscordDataInfo } from '../../../types/discord';
import sendAxios from './sendAxios';

// Prefixo padrão para todas as mensagens enviadas para o Discord
const beforeMessageEnv = `${process.env.DISCORD_CHAT_APP_NAME} |`;

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
const sendErrorDisc = async (data: DiscordDataError) => {
  const errorMessage =
    data.error instanceof Error
      ? `:rotating_light: :interrobang: ${data.error.message}`
      : ':rotating_light: :interrobang: Erro desconhecido';
  sendAxios(errorMessage, beforeMessageEnv, data.embed);
};

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
const sendInfoDisc = async (data: DiscordDataInfo) => {
  const infoMessage = `:white_check_mark: ${data.message}`;
  sendAxios(infoMessage, beforeMessageEnv, data.embed);
};

export { sendErrorDisc, sendInfoDisc };
