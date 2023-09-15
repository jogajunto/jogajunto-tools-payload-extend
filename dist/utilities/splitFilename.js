"use strict";
/**
 * @module utilities/splitFilename
 * @description Este módulo fornece funções para manipular e formatar nomes de arquivos.
 * Ele inclui utilidades para dividir nomes de arquivos em nome e extensão,
 * bem como formatar uma string contendo um nome de arquivo como um slug mantendo sua extensão.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSlugStringWithExtension = exports.splitFilename = void 0;
const formatSlugString_1 = require("./formatSlugString");
/**
 * Divide o nome do arquivo em nome e extensão.
 *
 * @param filename O nome do arquivo a ser dividido.
 * @returns Uma tupla com o nome e a extensão.
 */
function splitFilename(filename) {
    // Considera extensões que podem ter múltiplos pontos, como .tar.gz
    const extPattern = /(\.[a-z0-9]+(?:\.[a-z0-9]+)*)$/i;
    const ext = filename.match(extPattern);
    // Se não encontrar uma extensão ou se o nome do arquivo começar com um ponto (como .gitignore),
    // retorna o nome do arquivo como está.
    if (!ext || filename.charAt(0) === '.') {
        return [filename, ''];
    }
    const name = filename.slice(0, ext.index);
    return [name, ext[0]];
}
exports.splitFilename = splitFilename;
/**
 * Formata a string como um slug e mantém sua extensão.
 *
 * @param input A string de entrada que contém o nome do arquivo.
 * @returns O nome do arquivo slugificado com sua extensão.
 */
function formatSlugStringWithExtension(input) {
    const [name, extension] = splitFilename(input);
    const slugifiedName = (0, formatSlugString_1.formatSlugString)(name);
    return `${slugifiedName}${extension}`;
}
exports.formatSlugStringWithExtension = formatSlugStringWithExtension;
