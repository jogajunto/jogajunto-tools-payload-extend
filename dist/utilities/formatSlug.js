"use strict";
/**
 * @module utilities/formatSlug
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSlug = exports.format = exports.removeAccents = void 0;
/**
 * Remove acentos de uma string.
 *
 * @function
 * @param {string} str - String que pode conter caracteres acentuados.
 * @returns {string} String sem acentos.
 */
const removeAccents = (str) => {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
    const accentsOut = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
    return str
        .split('')
        .map((letter, index) => {
        const accentIndex = accents.indexOf(letter);
        return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
    })
        .join('');
};
exports.removeAccents = removeAccents;
/**
 * Formata uma string para ser utilizada como slug, removendo acentos, convertendo espaços para hífens e
 * removendo caracteres não alfanuméricos.
 *
 * @function
 * @param {string} val - String a ser formatada.
 * @returns {string} String formatada como slug.
 */
const format = (val) => (0, exports.removeAccents)(val)
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();
exports.format = format;
/**
 * Formata um valor como slug ou utiliza um valor de fallback se o valor principal não estiver disponível.
 *
 * @function
 * @param {string} fallback - Nome do campo de fallback.
 * @returns {FieldHook} Função hook para ser usada pelo Payload.
 */
const formatSlug = (fallback) => ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
        return (0, exports.format)(value);
    }
    const fallbackData = (data && data[fallback]) || (originalDoc && originalDoc[fallback]);
    if (fallbackData && typeof fallbackData === 'string') {
        return (0, exports.format)(fallbackData);
    }
    return value;
};
exports.formatSlug = formatSlug;
