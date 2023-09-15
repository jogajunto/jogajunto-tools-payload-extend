/**
 * @module utilities/splitFilename
 * @description Este módulo fornece funções para manipular e formatar nomes de arquivos.
 * Ele inclui utilidades para dividir nomes de arquivos em nome e extensão,
 * bem como formatar uma string contendo um nome de arquivo como um slug mantendo sua extensão.
 */
/**
 * Divide o nome do arquivo em nome e extensão.
 *
 * @param filename O nome do arquivo a ser dividido.
 * @returns Uma tupla com o nome e a extensão.
 */
export declare function splitFilename(filename: string): [string, string];
/**
 * Formata a string como um slug e mantém sua extensão.
 *
 * @param input A string de entrada que contém o nome do arquivo.
 * @returns O nome do arquivo slugificado com sua extensão.
 */
export declare function formatSlugStringWithExtension(input: string): string;
