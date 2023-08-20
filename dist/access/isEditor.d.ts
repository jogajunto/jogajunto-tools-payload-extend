import { Access } from 'payload/types';
import { UserType } from '../types/UserType';
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
export declare const isEditorOrOwnsDocument: Access<any, UserType>;
/**
 * Verifica se um usuário tem a função de 'editor'.
 *
 * @param {Object} req - O objeto de solicitação com informações do usuário.
 * @returns {boolean} Retorna verdadeiro se o usuário tem o papel de 'editor', caso contrário, retorna falso.
 */
export declare const isEditor: Access<any, UserType>;
