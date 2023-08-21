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
