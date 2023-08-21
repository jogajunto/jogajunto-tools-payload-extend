"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditor = exports.isEditorOrOwnsDocument = void 0;
/**
 * Verifica se um usuário tem a função de 'editor' ou é o proprietário do documento.
 *
 * Se o usuário for um 'admin', concede acesso total.
 * Se o usuário for um 'editor', restringe o acesso apenas ao próprio usuário.
 * Caso contrário, nega o acesso.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean|Object} Retorna verdadeiro se tiver permissão total, um objeto de condição se for restrito, ou falso para negar acesso.
 */
const isEditorOrOwnsDocument = ({ req }) => {
    var _a, _b;
    const user = req.user;
    if (Boolean((_a = user === null || user === void 0 ? void 0 : user.roles) === null || _a === void 0 ? void 0 : _a.includes('admin')))
        return true;
    if (Boolean((_b = user === null || user === void 0 ? void 0 : user.roles) === null || _b === void 0 ? void 0 : _b.includes('editor'))) {
        return {
            id: {
                equals: user.id,
            },
        };
    }
    return false;
};
exports.isEditorOrOwnsDocument = isEditorOrOwnsDocument;
/**
 * Verifica se um usuário tem a função de 'editor'.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário tem o papel de 'editor', caso contrário, retorna falso.
 */
const isEditor = ({ req }) => {
    var _a, _b;
    return Boolean((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles) === null || _b === void 0 ? void 0 : _b.includes('editor'));
};
exports.isEditor = isEditor;
