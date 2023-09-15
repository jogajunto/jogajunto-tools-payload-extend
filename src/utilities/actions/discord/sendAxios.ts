import axios from 'axios';
import { EmbedData } from '../../../types';

// URL do Webhook para notificações do Discord
const webhookURL = process.env.DISCORD_CODENZBOT_WEBHOOK;

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
const sendAxios = async (
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
  if (!embed) embed = undefined;

  let response = await axios
    .post(webhookURL, {
      content: content,
      embed: embed,
    })
    .catch((err) => {
      console.error('Erro ao enviar a notificação para o Discord:', err);
    });

  console.log('sendAxios -> response', response);
};

export default sendAxios;
