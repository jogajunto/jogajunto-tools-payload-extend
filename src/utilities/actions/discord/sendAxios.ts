import axios from 'axios';

const webhookURL = process.env.DISCORD_CODENZBOT_WEBHOOK;

const sendAxios = (message: string, beforeMessage?: string) => {
  let getBeforeMessage = beforeMessage;
  let content = getBeforeMessage
    ? `${getBeforeMessage} ${message}`
    : `${message}`;
  axios
    .post(webhookURL, {
      content: content,
    })
    .catch((err) => {
      console.error('Erro ao enviar a notificação para o Discord:', err);
    });
};

export default sendAxios;
