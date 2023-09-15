/**
 * @module formatSlugString
 * @description Este módulo fornece utilidades para formatar strings em formato de slug. 
 * Ele contém funções que ajudam a transformar strings comuns em strings slugificadas 
 * adequadas para URLs, nomes de arquivos, identificadores e outros casos de uso em que 
 * um formato simplificado é necessário.
 */

import { format } from './formatSlug';

/**
 * Formata uma string para ser utilizada como slug.
 *
 * @function
 * @param {string} val - String a ser formatada.
 * @returns {string} String formatada como slug.
 */
export const formatSlugString = (val: string): string => {
  return format(val);
};
