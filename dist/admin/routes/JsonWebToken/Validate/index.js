"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const payload_1 = __importDefault(require("payload"));
/**
 * Função para validar um token JSON Web.
 * Esta função verifica se um token específico é válido e ainda não foi usado.
 *
 * @param req - Requisição recebida.
 * @param res - Resposta a ser enviada.
 */
const Validate = (req, res) => {
    try {
        let rawData = '';
        // Coleta os dados do body da requisição.
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        req.on('end', async () => {
            try {
                // Extração do token do rawData.
                const token = JSON.parse(rawData).token;
                // Busca pelo token no sistema para verificar se ele é válido e ainda não foi usado.
                const response = await payload_1.default.find({
                    collection: 'tokennewusers',
                    where: {
                        token: { equals: token },
                        used: { equals: false || undefined },
                    },
                });
                // Se não houver docs na resposta, significa que o token é inválido.
                if (response.docs.length <= 0) {
                    return res.status(400).send({ message: 'Token inválido' });
                }
                // Pega o token encontrado na resposta.
                const findToken = response.docs[0].token;
                // Define a chave secreta para a validação do token.
                const secret = process.env.PAYLOAD_SECRET ?? 'secret_key';
                // Verifica o token com a chave secreta.
                jwt.verify(findToken, secret);
                // Token é válido.
                return res
                    .status(200)
                    .json({ message: 'Token verificado com sucesso.' });
            }
            catch (error) {
                let errorMessage = 'An unknown error occurred.';
                // Determina o tipo de erro que ocorreu durante a validação do token.
                if (error instanceof Error ||
                    error instanceof jwt.TokenExpiredError ||
                    error instanceof jwt.NotBeforeError ||
                    error instanceof jwt.JsonWebTokenError) {
                    errorMessage = error.message;
                }
                // Retorna uma mensagem de erro.
                return res.status(500).send({ message: errorMessage });
            }
        });
    }
    catch (error) {
        console.error('Erro ao validar token:', error);
        return res.status(500).send({ message: 'Erro interno do servidor.' });
    }
};
exports.default = Validate;
