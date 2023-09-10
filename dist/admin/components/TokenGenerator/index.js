"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const forms_1 = require("payload/components/forms");
const utilities_1 = require("payload/components/utilities");
const baseClass = 'tokenGenerator';
const TokenGenerator = ({ path, label, required }) => {
    const { value, setValue } = (0, forms_1.useField)({ path });
    const authentication = (0, utilities_1.useAuth)();
    const fieldName = path.split('.').pop();
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
    return (react_1.default.createElement("div", { className: baseClass },
        react_1.default.createElement(forms_1.TextInput, { value: value, path: path, name: fieldName, label: label, readOnly: true, onChange: (e) => setValue(e.target.value) }),
        value && (react_1.default.createElement("div", { className: 'link-new-user' },
            react_1.default.createElement("strong", null, "Envie o link de cadastro para o cliente:"),
            react_1.default.createElement("br", null),
            react_1.default.createElement("textarea", { name: 'copy-link', id: 'copy-link', className: 'textarea-element', style: { width: '100%' }, readOnly: true, rows: 10, value: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/new-user?token=${value}` }))),
        react_1.default.createElement("button", { className: 'btn btn--style-primary btn--icon-style-without-border btn--size-medium btn--icon-position-right', id: 'generate-token', onClick: generateToken }, "Gerar Token")));
};
exports.default = TokenGenerator;
