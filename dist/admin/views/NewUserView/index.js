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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_toastify_1 = require("react-toastify");
const react_i18next_1 = require("react-i18next");
const utilities_1 = require("payload/components/utilities");
const Minimal_1 = __importDefault(require("payload/dist/admin/components/templates/Minimal"));
const Form_1 = __importDefault(require("payload/dist/admin/components/forms/Form"));
const Email_1 = __importDefault(require("payload/dist/admin/components/forms/field-types/Email"));
const Password_1 = __importDefault(require("payload/dist/admin/components/forms/field-types/Password"));
const Text_1 = __importDefault(require("payload/dist/admin/components/forms/field-types/Text"));
const ConfirmPassword_1 = __importDefault(require("payload/dist/admin/components/forms/field-types/ConfirmPassword"));
const HiddenInput_1 = __importDefault(require("payload/dist/admin/components/forms/field-types/HiddenInput"));
const Submit_1 = __importDefault(require("payload/dist/admin/components/forms/Submit"));
/**
 * Utilidade para retornar os parâmetros da query da URL atual.
 * @returns URLSearchParams da localização atual.
 */
const useQuery = () => {
    return new URLSearchParams((0, react_router_dom_1.useLocation)().search);
};
/**
 * Componente responsável por criar um novo usuário a partir de um token válido.
 */
const NewUser = () => {
    const config = (0, utilities_1.useConfig)();
    const { admin: { user: userSlug, logoutRoute }, serverURL, routes: { admin, api }, } = config;
    const query = useQuery();
    const token = query.get('token') ?? 'token_where';
    const { t } = (0, react_i18next_1.useTranslation)('authentication');
    const [validToken, setValidToken] = (0, react_1.useState)(false);
    const [newEmailUser, setNewEmailUser] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [createdUser, setCreatedUser] = (0, react_1.useState)(false);
    const authentication = (0, utilities_1.useAuth)();
    (0, react_1.useEffect)(() => {
        validateToken();
    });
    /**
     * Valida o token fornecido.
     * Se o token for válido, o formulário é mostrado.
     * Caso contrário, o usuário é redirecionado para uma página não autorizada.
     */
    const validateToken = async () => {
        try {
            const response = await fetch(`/validate-jsonwebtoken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                if (authentication.user) {
                    setValidToken(false);
                    setLoading(false);
                }
                else {
                    setValidToken(true);
                    setLoading(false);
                }
            }
            else {
                setLoading(false);
            }
        }
        catch (error) {
            let errorMessage = 'An unknown error occurred.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            react_toastify_1.toast.error(t(errorMessage));
        }
    };
    /**
     * Trata o sucesso após a criação de um novo usuário.
     * Invalida o token após ser usado e atualiza o estado.
     * @param data - Os dados do usuário após a criação.
     */
    const onSuccess = async (data) => {
        try {
            if (data.doc?.id) {
                /**
                 * Invalidate token after used
                 */
                const invalidToken = await fetch('/set-used-jsonwebtoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                    }),
                });
                /**
                 * setNewEmailUser seta o email do usuário criado
                 */
                setNewEmailUser(data.doc.email);
                /**
                 * Informa que um usuário foi criado
                 */
                setCreatedUser(true);
            }
        }
        catch (error) {
            let errorMessage = 'An unknown error occurred.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            react_toastify_1.toast.error(t(errorMessage));
        }
    };
    return (react_1.default.createElement(Minimal_1.default, null,
        validToken && !createdUser ? (react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Cadastre-se"),
            react_1.default.createElement("p", null, "Preencha com seus dados para cadastrar uma nova conta."),
            react_1.default.createElement(Form_1.default, { onSuccess: onSuccess, method: 'post', action: `${serverURL}/api/users` },
                react_1.default.createElement(Text_1.default, { label: 'Nome', name: 'name', required: true, admin: {
                        description: 'Insira o seu nome completo',
                    } }),
                react_1.default.createElement(Email_1.default, { label: 'Email', name: 'email', required: true, admin: {
                        description: 'Insira o endereço de e-mail para a sua conta',
                    } }),
                react_1.default.createElement(Password_1.default, { label: t('newPassword'), name: 'password', autoComplete: 'off', required: true }),
                react_1.default.createElement(ConfirmPassword_1.default, null),
                react_1.default.createElement(HiddenInput_1.default, { name: 'token', value: token }),
                react_1.default.createElement(Submit_1.default, null, t('Cadastre-se'))))) : (!validToken &&
            !loading &&
            !createdUser && react_1.default.createElement(react_router_dom_1.Redirect, { to: `${admin}/unauthorized` })),
        createdUser && (react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Usu\u00E1rio criado com sucesso!"),
            react_1.default.createElement("p", null,
                "Por favor, verifique o email enviado para ",
                react_1.default.createElement("b", null, newEmailUser))))));
};
exports.default = NewUser;
