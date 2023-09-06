import axios from 'axios';
import { EmbedData } from '../../../types';

const webhookURL = process.env.DISCORD_CODENZBOT_WEBHOOK;

const sendAxios = (
  message: string,
  beforeMessage?: string,
  embed?: EmbedData
) => {
  if (!webhookURL) {
    console.error('WEBHOOK_URL não está definido.');
    return;
  }

  let getBeforeMessage = beforeMessage;
  let content = getBeforeMessage
    ? `${getBeforeMessage} ${message}`
    : `${message}`;

  if (embed) console.log('embed:', embed);

  let response = axios
    .post(webhookURL, {
      content: content,
      embed: embed ?? null,
    })
    .catch((err) => {
      console.error('Erro ao enviar a notificação para o Discord:', err);
    });

  console.log('sendAxios -> response', response);
};

export default sendAxios;
