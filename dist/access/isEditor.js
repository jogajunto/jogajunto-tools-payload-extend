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
    const user = req.user;
    if (Boolean(user?.roles?.includes('admin')))
        return true;
    if (Boolean(user?.roles?.includes('editor'))) {
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
    return Boolean(req.user?.roles?.includes('editor'));
};
exports.isEditor = isEditor;
