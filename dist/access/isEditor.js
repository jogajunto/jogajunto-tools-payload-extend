"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditor = exports.isEditorOrOwnsDocument = void 0;
const isEditorOrOwnsDocument = ({ req }) => {
    var _a, _b;
    const user = req.user;
    // Se o usuário tiver o papel de 'admin', conceder acesso total
    if (Boolean((_a = user === null || user === void 0 ? void 0 : user.roles) === null || _a === void 0 ? void 0 : _a.includes('admin')))
        return true;
    // Se o usuário tiver o papel de 'editor', restringir a consulta para incluir apenas o próprio usuário
    if (Boolean((_b = user === null || user === void 0 ? void 0 : user.roles) === null || _b === void 0 ? void 0 : _b.includes('editor'))) {
        return {
            id: {
                equals: user.id,
            },
        };
    }
    // Para outros casos, negar acesso
    return false;
};
exports.isEditorOrOwnsDocument = isEditorOrOwnsDocument;
const isEditor = ({ req }) => {
    var _a, _b;
    return Boolean((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.roles) === null || _b === void 0 ? void 0 : _b.includes('editor'));
};
exports.isEditor = isEditor;
