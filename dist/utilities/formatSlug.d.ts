/**
 * @module utilities/formatSlug
 */
import { FieldHook } from 'payload/types';
/**
 * Remove acentos de uma string.
 *
 * @function
 * @param {string} str - String que pode conter caracteres acentuados.
 * @returns {string} String sem acentos.
 */
export declare const removeAccents: (str: string) => string;
/**
 * Formata uma string para ser utilizada como slug, removendo acentos, convertendo espaços para hífens e
 * removendo caracteres não alfanuméricos.
 *
 * @function
 * @param {string} val - String a ser formatada.
 * @returns {string} String formatada como slug.
 */
export declare const format: (val: string) => string;
/**
 * Formata um valor como slug ou utiliza um valor de fallback se o valor principal não estiver disponível.
 *
 * @function
 * @param {string} fallback - Nome do campo de fallback.
 * @returns {FieldHook} Função hook para ser usada pelo Payload.
 */
export declare const formatSlug: (fallback: string) => FieldHook;
