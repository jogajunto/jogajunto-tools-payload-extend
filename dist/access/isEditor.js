"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEditor = exports.isEditorOrOwnsDocument = void 0;
var isEditorOrOwnsDocument = function (_a) {
    var _b, _c;
    var req = _a.req;
    var user = req.user;
    // Se o usuário tiver o papel de 'admin', conceder acesso total
    if (Boolean((_b = user === null || user === void 0 ? void 0 : user.roles) === null || _b === void 0 ? void 0 : _b.includes('admin')))
        return true;
    // Se o usuário tiver o papel de 'editor', restringir a consulta para incluir apenas o próprio usuário
    if (Boolean((_c = user === null || user === void 0 ? void 0 : user.roles) === null || _c === void 0 ? void 0 : _c.includes('editor'))) {
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
var isEditor = function (_a) {
    var _b, _c;
    var req = _a.req;
    return Boolean((_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.roles) === null || _c === void 0 ? void 0 : _c.includes('editor'));
};
exports.isEditor = isEditor;
