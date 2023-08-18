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
const axios_1 = __importDefault(require("axios"));
const discord_1 = require("../discord");
const sendAction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Tenta enviar os dados para a Github Action
    try {
        const githubToken = (_a = process.env.GITHUB_TOKEN) !== null && _a !== void 0 ? _a : 'empty';
        const repositoryDispatchURL = (_b = process.env.REPOSITORY_DISPATCH_URL) !== null && _b !== void 0 ? _b : 'empty';
        const headers = {
            Accept: 'application/vnd.github.everest-preview+json',
            Authorization: `token ${githubToken}`,
        };
        const response = yield axios_1.default.post(repositoryDispatchURL, data, {
            headers,
        });
        if ((_c = response === null || response === void 0 ? void 0 : response.config) === null || _c === void 0 ? void 0 : _c.data) {
            const responseData = JSON.parse(response.config.data);
            let info = `Tipo de evento: \`${responseData.event_type}\` | Slug: \`${responseData.client_payload.slug}\` | Diretório: \`${responseData.client_payload.directory}\``;
            const data = { message: info };
            (0, discord_1.sendInfoDisc)(data);
        }
    }
    catch (error) {
        const data = { error: error };
        (0, discord_1.sendErrorDisc)(data);
    }
});
exports.default = sendAction;
