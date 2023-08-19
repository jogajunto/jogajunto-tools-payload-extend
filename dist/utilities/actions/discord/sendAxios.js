"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var webhookURL = process.env.DISCORD_CODENZBOT_WEBHOOK;
var sendAxios = function (message, beforeMessage) {
    var getBeforeMessage = beforeMessage;
    var content = getBeforeMessage
        ? "".concat(getBeforeMessage, " ").concat(message)
        : "".concat(message);
    axios_1.default
        .post(webhookURL, {
        content: content,
    })
        .catch(function (err) {
        console.error('Erro ao enviar a notificação para o Discord:', err);
    });
};
exports.default = sendAxios;
