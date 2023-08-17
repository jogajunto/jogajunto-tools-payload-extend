import axios from 'axios';
import { DiscordDataError, DiscordDataInfo, GitData } from '../../../types';
import { sendErrorDisc, sendInfoDisc } from '../discord';

const sendAction = async (data: GitData) => {
  // Tenta enviar os dados para a Github Action
  try {
    const githubToken = process.env.GITHUB_TOKEN ?? 'empty';
    const repositoryDispatchURL =
      process.env.REPOSITORY_DISPATCH_URL ?? 'empty';

    const headers = {
      Accept: 'application/vnd.github.everest-preview+json',
      Authorization: `token ${githubToken}`,
    };

    const response = await axios.post(repositoryDispatchURL, data, {
      headers,
    });
    if (response?.config?.data) {
      const responseData = JSON.parse(response.config.data);
      let info = `Tipo de evento: \`${responseData.event_type}\` | Slug: \`${responseData.client_payload.slug}\` | Diretório: \`${responseData.client_payload.directory}\``;

      const data: DiscordDataInfo = { message: info };
      sendInfoDisc(data);
    }
  } catch (error) {
    const data: DiscordDataError = { error: error };
    sendErrorDisc(data);
  }
};

export default sendAction;
