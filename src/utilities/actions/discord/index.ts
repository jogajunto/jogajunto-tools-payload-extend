import { DiscordDataError, DiscordDataInfo } from '../../../types';
import sendAxios from './sendAxios';

const beforeMessageEnv = `${process.env.DISCORD_CHAT_APP_NAME} |`;

const sendErrorDisc = async (data: DiscordDataError) => {
  const errorMessage =
    data.error instanceof Error
      ? `:rotating_light: :interrobang: ${data.error.message}`
      : ':rotating_light: :interrobang: Erro desconhecido';
  sendAxios(errorMessage, beforeMessageEnv);
};

const sendInfoDisc = async (data: DiscordDataInfo) => {
  const infoMessage = `:white_check_mark: ${data.message}`;
  sendAxios(infoMessage, beforeMessageEnv);
};

export { sendErrorDisc, sendInfoDisc };
