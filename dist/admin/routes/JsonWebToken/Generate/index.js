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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
/**
 * Função para gerar um JSON Web Token (JWT) com base nos dados recebidos.
 * O JWT gerado é do tipo 'user-invite' e tem uma validade de 1 hora.
 *
 * @param req - Requisição recebida.
 * @param res - Resposta a ser enviada.
 */
const Generate = (req, res) => {
    try {
        let rawData = '';
        // Coletando dados do body da requisição
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(rawData);
                // Verificando a validade dos dados e se o usuário tem a role 'admin'
                if (!data || !data.user.roles.includes('admin')) {
                    return res.status(400).send({ message: 'Não encontrado' });
                }
                const secret = process.env.PAYLOAD_SECRET ?? 'secret_key';
                /**
                 * Função interna para gerar o JWT.
                 */
                const generateToken = () => {
                    return jwt.sign({ type: 'user-invite' }, secret, { expiresIn: '1h' });
                };
                const token = generateToken();
                // Verificar se o token foi gerado corretamente
                if (!token)
                    return res
                        .status(400)
                        .send({ message: 'Algo de errado ao gerar o token.' });
                // Retornar o token gerado
                return res
                    .status(200)
                    .send({ token: token, message: 'Token gerado com sucesso.' });
            }
            catch (error) {
                let errorMessage = 'An unknown error occurred.';
                // Lidando com possíveis erros durante a geração do JWT
                if (error instanceof Error ||
                    error instanceof jwt.TokenExpiredError ||
                    error instanceof jwt.NotBeforeError ||
                    error instanceof jwt.JsonWebTokenError) {
                    errorMessage = error.message;
                }
                return res.status(500).send({ message: errorMessage });
            }
        });
    }
    catch (error) {
        console.error('Erro ao gerar token:', error);
        res.status(500).send({ message: 'Erro interno do servidor.' });
    }
};
/**
 * Exportando a função Generate para ser utilizada em outras partes do código.
 */
exports.default = Generate;
