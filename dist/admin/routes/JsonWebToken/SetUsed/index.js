"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payload_1 = __importDefault(require("payload"));
const SetUsed = (req, res) => {
    try {
        let rawData = '';
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        req.on('end', async () => {
            try {
                const token = JSON.parse(rawData).token;
                const response = await payload_1.default.update({
                    collection: 'tokennewusers',
                    where: {
                        token: { equals: token },
                    },
                    data: {
                        used: true,
                    },
                });
                if (response.docs.length <= 0) {
                    return res
                        .status(400)
                        .send({ message: 'Algo de errado ao validar o token.' });
                }
                /** Valid token */
                return res
                    .status(200)
                    .json({ message: 'Token verificado com sucesso.' });
            }
            catch (error) {
                console.error('Erro na requisição:', error);
                res.status(500).send({ message: 'Erro interno do servidor.' });
            }
        });
    }
    catch (error) {
        console.error('Erro ao validar token:', error);
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
};
exports.default = SetUsed;
