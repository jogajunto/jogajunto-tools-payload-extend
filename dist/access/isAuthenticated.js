"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
/**
 * Verifica se um usuário está autenticado.
 *
 * Uma simples verificação para determinar se o objeto de solicitação possui
 * informações de usuário, indicando uma sessão autenticada.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário está autenticado, caso contrário, retorna falso.
 */
var isAuthenticated = function (_a) {
    var req = _a.req;
    return Boolean(req.user);
};
exports.isAuthenticated = isAuthenticated;
