"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminFieldLevel = exports.isAdmin = void 0;
/**
 * Verifica se um usuário tem a função de 'admin'.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário tem o papel de 'admin', caso contrário, retorna falso.
 */
const isAdmin = ({ req: { user } }) => {
    return Boolean(user?.roles?.includes('admin'));
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
const isAdminFieldLevel = ({ req: { user } }) => {
    return Boolean(user?.roles?.includes('admin'));
};
exports.isAdminFieldLevel = isAdminFieldLevel;
