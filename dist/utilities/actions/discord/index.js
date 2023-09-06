"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInfoDisc = exports.sendErrorDisc = void 0;
const sendAxios_1 = __importDefault(require("./sendAxios"));
const beforeMessageEnv = `${process.env.DISCORD_CHAT_APP_NAME} |`;
const sendErrorDisc = async (data) => {
    const errorMessage = data.error instanceof Error
        ? `:rotating_light: :interrobang: ${data.error.message}`
        : ':rotating_light: :interrobang: Erro desconhecido';
    (0, sendAxios_1.default)(errorMessage, beforeMessageEnv, data.embed);
};
exports.sendErrorDisc = sendErrorDisc;
const sendInfoDisc = async (data) => {
    const infoMessage = `:white_check_mark: ${data.message}`;
    (0, sendAxios_1.default)(infoMessage, beforeMessageEnv, data.embed);
};
exports.sendInfoDisc = sendInfoDisc;
