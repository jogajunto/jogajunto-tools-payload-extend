import { Access, FieldAccess } from 'payload/types';
import { UserType } from '../types/UserType';
/**
 * Verifica se um usuário tem a função de 'admin'.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário tem o papel de 'admin', caso contrário, retorna falso.
 */
export declare const isAdmin: Access<any, UserType>;
/**
 * Verifica a nível de campo se o usuário é um 'admin'.
 *
 * Esta função é similar à função 'isAdmin', mas foi projetada para
 * ser utilizada em verificações de nível de campo.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário tem o papel de 'admin', caso contrário, retorna falso.
 */
export declare const isAdminFieldLevel: FieldAccess<{
    id: string;
}, unknown, UserType>;
