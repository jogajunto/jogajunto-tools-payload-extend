"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendInfoDisc = exports.sendErrorDisc = void 0;
const sendAxios_1 = __importDefault(require("./sendAxios"));
const beforeMessageEnv = `${process.env.DISCORD_CHAT_APP_NAME} |`;
const sendErrorDisc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const errorMessage = data.error instanceof Error
        ? `:rotating_light: :interrobang: ${data.error.message}`
        : ':rotating_light: :interrobang: Erro desconhecido';
    (0, sendAxios_1.default)(errorMessage, beforeMessageEnv);
});
exports.sendErrorDisc = sendErrorDisc;
const sendInfoDisc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const infoMessage = `:white_check_mark: ${data.message}`;
    (0, sendAxios_1.default)(infoMessage, beforeMessageEnv);
});
exports.sendInfoDisc = sendInfoDisc;
