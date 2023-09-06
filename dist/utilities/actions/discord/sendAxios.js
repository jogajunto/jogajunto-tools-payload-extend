"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const webhookURL = process.env.DISCORD_CODENZBOT_WEBHOOK;
const sendAxios = (message, beforeMessage, embed) => {
    if (!webhookURL) {
        console.error('WEBHOOK_URL não está definido.');
        return;
    }
    let getBeforeMessage = beforeMessage;
    let content = getBeforeMessage
        ? `${getBeforeMessage} ${message}`
        : `${message}`;
    if (embed)
        console.log('embed:', embed);
    let response = axios_1.default
        .post(webhookURL, {
        content: content,
        embed: embed ?? null,
    })
        .catch((err) => {
        console.error('Erro ao enviar a notificação para o Discord:', err);
    });
    console.log('sendAxios -> response', response);
};
exports.default = sendAxios;
