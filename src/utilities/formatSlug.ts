/**
 * @module formatSlug
 */

import { FieldHook } from 'payload/types';

/**
 * Remove acentos de uma string.
 *
 * @function
 * @param {string} str - String que pode conter caracteres acentuados.
 * @returns {string} String sem acentos.
 */
export const removeAccents = (str: string) => {
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

/**
 * Formata uma string para ser utilizada como slug, removendo acentos, convertendo espaços para hífens e 
 * removendo caracteres não alfanuméricos.
 *
 * @function
 * @param {string} val - String a ser formatada.
 * @returns {string} String formatada como slug.
 */
export const format = (val: string): string =>
  removeAccents(val)
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

/**
 * Formata um valor como slug ou utiliza um valor de fallback se o valor principal não estiver disponível.
 *
 * @function
 * @param {string} fallback - Nome do campo de fallback.
 * @returns {FieldHook} Função hook para ser usada pelo Payload.
 */
export const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return format(value);
    }
    const fallbackData =
      (data && data[fallback]) || (originalDoc && originalDoc[fallback]);

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData);
    }

    return value;
  };
