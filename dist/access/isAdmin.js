"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminFieldLevel = exports.isAdmin = void 0;
/**
 * Verifica se um usuário tem a função de 'admin'.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário tem o papel de 'admin', caso contrário, retorna falso.
 */
var isAdmin = function (_a) {
    var _b;
    var user = _a.req.user;
    return Boolean((_b = user === null || user === void 0 ? void 0 : user.roles) === null || _b === void 0 ? void 0 : _b.includes('admin'));
};
exports.isAdmin = isAdmin;
/**
 * Verifica a nível de campo se o usuário é um 'admin'.
 *
 * Esta função é similar à função 'isAdmin', mas foi projetada para
 * ser utilizada em verificações de nível de campo.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário tem o papel de 'admin', caso contrário, retorna falso.
 */
var isAdminFieldLevel = function (_a) {
    var _b;
    var user = _a.req.user;
    return Boolean((_b = user === null || user === void 0 ? void 0 : user.roles) === null || _b === void 0 ? void 0 : _b.includes('admin'));
};
exports.isAdminFieldLevel = isAdminFieldLevel;
