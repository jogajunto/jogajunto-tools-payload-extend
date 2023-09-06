"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const discord_1 = require("../discord");
const sendAction = async (dataToSend) => {
    try {
        const githubToken = process.env.GITHUB_TOKEN;
        const repositoryDispatchURL = process.env.REPOSITORY_DISPATCH_URL;
        if (!githubToken || !repositoryDispatchURL) {
            throw new Error('Missing GITHUB_TOKEN or REPOSITORY_DISPATCH_URL in environment variables.');
        }
        // In production not send to github and discord
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
            const discordInfo = {
                message: '\n',
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
