import axios from 'axios';
import { DiscordDataError, DiscordDataInfo, GitData } from '../../../types';
import { sendErrorDisc, sendInfoDisc } from '../discord';

const sendAction = async (dataToSend: GitData) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const repositoryDispatchURL = process.env.REPOSITORY_DISPATCH_URL;

    if (!githubToken || !repositoryDispatchURL) {
      throw new Error(
        'Missing GITHUB_TOKEN or REPOSITORY_DISPATCH_URL in environment variables.'
      );
    }

    const headers = {
      Accept: 'application/vnd.github.everest-preview+json',
      Authorization: `token ${githubToken}`,
    };

    const response = await axios.post(repositoryDispatchURL, dataToSend, {
      headers,
    });

    if (
      (response.status === 200 && response?.config?.data) ||
      (response.status === 204 && response?.config?.data)
    ) {
      const responseData = JSON.parse(response.config.data);
      let info = `Tipo de evento: \`${responseData.event_type}\` | Slug: \`${responseData.client_payload.slug}\` | Diretório: \`${responseData.client_payload.directory}\``;

      const discordInfo: DiscordDataInfo = { message: info };
      sendInfoDisc(discordInfo);
    }
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    const discordError: DiscordDataError = { error: new Error(errorMessage) };
    sendErrorDisc(discordError);
  }
};

export default sendAction;
