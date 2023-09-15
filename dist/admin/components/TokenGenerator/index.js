"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const forms_1 = require("payload/components/forms");
const utilities_1 = require("payload/components/utilities");
const react_toastify_1 = require("react-toastify");
// Classe base para o estilo do componente
const baseClass = 'tokenGenerator';
/**
 * Função para copiar texto para a área de transferência do usuário.
 * Apresenta uma notificação caso a operação seja bem-sucedida.
 *
 * @param {string} text - O texto a ser copiado.
 */
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        react_toastify_1.toast.info('Link copiado!');
    }
    catch (err) {
        console.error('Failed to copy text:', err);
    }
};
/**
 * Função de auxílio para copiar o link para a área de transferência quando um evento é disparado.
 *
 * @param {any} event - O evento que dispara a função.
 */
const copyLinkToClipboard = (event) => {
    copyToClipboard(event.target.value);
};
/**
 * Componente React para gerar tokens e disponibilizá-los em um campo de entrada para o usuário.
 *
 * @param path - Caminho associado ao campo de valor.
 * @param label - Etiqueta para o campo de entrada.
 * @param required - Flag que indica se o campo é obrigatório ou não.
 * @returns {React.FC<any>} Componente React.
 */
const TokenGenerator = ({ path, label, required }) => {
    // Utilizando hooks de campo e autenticação
    const { value, setValue } = (0, forms_1.useField)({ path });
    const authentication = (0, utilities_1.useAuth)();
    // Obtendo o nome do campo do path fornecido
    const fieldName = path.split('.').pop();
    /**
     * Função assíncrona para gerar tokens quando acionada.
     * Faz uma chamada API para obter o token e atualiza o valor do campo.
     *
     * @param {any} e - Evento que dispara a função.
     */
    const generateToken = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`/generate-jsonwebtoken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: authentication.user }),
            });
            const data = await response.json();
            setValue(data.token); // Aqui definimos o valor do token para o campo.
        }
        catch (error) {
            console.error('Erro ao gerar token:', error);
        }
    };
    // Renderizando o componente
    return (react_1.default.createElement("div", { className: baseClass },
        react_1.default.createElement(forms_1.TextInput, { value: value, path: path, name: fieldName, label: label, readOnly: true, onChange: (e) => setValue(e.target.value) }),
        value && (react_1.default.createElement("div", { className: 'link-new-user' },
            react_1.default.createElement("strong", null, "Envie o link de cadastro para o cliente:"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("textarea", { name: 'copy-link', id: 'copy-link', className: 'textarea-element', style: { width: '100%' }, onClick: (event) => {
                    copyLinkToClipboard(event);
                }, readOnly: true, rows: 10, value: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/new-user?token=${value}` }))),
        react_1.default.createElement("button", { className: 'btn btn--style-primary btn--icon-style-without-border btn--size-medium btn--icon-position-right', id: 'generate-token', onClick: generateToken }, "Gerar Token")));
};
exports.default = TokenGenerator;
