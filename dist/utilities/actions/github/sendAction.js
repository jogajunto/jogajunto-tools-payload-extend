"use strict";
/**
 * @module sendAction
 * @description Este módulo fornece uma função que permite enviar uma ação para o GitHub.
 *
 * Principais características e funcionalidades:
 *
 * - Envia solicitações ao GitHub usando dados formatados específicos.
 * - Se estiver no ambiente de desenvolvimento, a função apenas loga os dados sem enviar a real solicitação ao GitHub.
 * - Em caso de sucesso ao enviar a solicitação para o GitHub, uma notificação é enviada para o Discord.
 * - Utiliza variáveis de ambiente para obter o token do GitHub e a URL de dispatch do repositório.
 * - Faz uma checagem de segurança para garantir que as variáveis de ambiente necessárias estão definidas antes de tentar enviar a solicitação.
 * - Se ocorrer um erro durante o processo, ele é capturado e uma notificação de erro é enviada ao Discord.
 *
 * Este módulo é fundamental para garantir que as operações executadas no Payload CMS sejam devidamente comunicadas ao GitHub e,
 * consequentemente, para notificar a equipe via Discord sobre os resultados dessas operações.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const discord_1 = require("../discord");
/**
 * Envia uma ação para o GitHub.
 *
 * Esta função permite enviar uma ação para o GitHub. Se o ambiente for
 * de desenvolvimento, ele apenas exibe os dados no console, mas não envia
 * nada. Se for bem-sucedido ao enviar a ação, ele também notifica o Discord.
 *
 * @async
 * @function
 * @param {GitData} dataToSend - Os dados a serem enviados ao GitHub.
 * @throws {Error} Se as variáveis de ambiente GITHUB_TOKEN ou REPOSITORY_DISPATCH_URL não estiverem definidas.
 */
const sendAction = async (dataToSend) => {
    try {
        const githubToken = process.env.GITHUB_TOKEN;
        const repositoryDispatchURL = process.env.REPOSITORY_DISPATCH_URL;
        if (!githubToken || !repositoryDispatchURL) {
            throw new Error('Missing GITHUB_TOKEN or REPOSITORY_DISPATCH_URL in environment variables.');
        }
        // Em produção não envia para o GitHub e para o Discord
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log('dataToSend: ', dataToSend);
            return;
        }
        const headers = {
            Accept: 'application/vnd.github.everest-preview+json',
            Authorization: `token ${githubToken}`,
        };
        const response = await axios_1.default.post(repositoryDispatchURL, dataToSend, {
            headers,
        });
        if ((response.status === 200 && response?.config?.data) ||
            (response.status === 204 && response?.config?.data)) {
            const responseData = JSON.parse(response.config.data);
            let info = `Tipo de evento: \`${responseData.event_type}\` | Slug: \`${responseData.client_payload.slug}\` | Diretório: \`${responseData.client_payload.directory}\``;
            const discordInfo = {
                message: info,
                embed: {
                    title: 'Notificação do CMS',
                    description: 'Segue as informações da notificação',
                    color: 'Green',
                    author: {
                        name: process.env.DISCORD_CHAT_APP_NAME,
                        icon_url: 'https://cdn-1.webcatalog.io/catalog/payload-cms/payload-cms-icon-filled-256.webp?v=1675593518505',
                    },
                    fields: [
                        {
                            name: 'Tipo de evento:',
                            value: responseData.event_type,
                        },
                        {
                            name: 'Slug:',
                            value: responseData.client_payload.slug,
                        },
                        {
                            name: 'Diretório:',
                            value: responseData.client_payload.directory,
                        },
                    ],
                },
            };
            (0, discord_1.sendInfoDisc)(discordInfo);
        }
    }
    catch (error) {
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        const discordError = { error: new Error(errorMessage) };
        (0, discord_1.sendErrorDisc)(discordError);
    }
};
exports.default = sendAction;
