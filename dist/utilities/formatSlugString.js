"use strict";
/**
 * @module utilities/formatSlugString
 * @description Este módulo fornece utilidades para formatar strings em formato de slug.
 * Ele contém funções que ajudam a transformar strings comuns em strings slugificadas
 * adequadas para URLs, nomes de arquivos, identificadores e outros casos de uso em que
 * um formato simplificado é necessário.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSlugString = void 0;
const formatSlug_1 = require("./formatSlug");
/**
 * Formata uma string para ser utilizada como slug.
 *
 * @function
 * @param {string} val - String a ser formatada.
 * @returns {string} String formatada como slug.
 */
const formatSlugString = (val) => {
    return (0, formatSlug_1.format)(val);
};
exports.formatSlugString = formatSlugString;
