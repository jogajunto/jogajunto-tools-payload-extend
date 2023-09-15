/**
 * @module utilities/markdownToContent
 * @description Converte Markdown para um formato de conteúdo customizado.
 */
/**
 * Tipo para representar um filho de texto.
 */
type TextChild = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
};
/**
 * Tipo para representar um filho que é um link.
 */
type LinkChild = {
    type: 'link';
    linkType: 'custom';
    url: string;
    newTab: boolean;
    children: TextChild[];
};
/**
 * Tipo para representar um item de lista.
 */
type ListItem = {
    type: 'li';
    children: TextChild[];
};
/**
 * Tipo para representar um bloco de conteúdo.
 */
type Block = {
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'indent';
    children: TextChild[];
} | {
    type: 'ul' | 'ol';
    children: ListItem[];
} | {
    type: 'upload';
    value: {
        id: string;
    };
    children: [];
} | {
    children: (TextChild | LinkChild)[];
};
/**
 * Converte uma string Markdown em uma lista de blocos de conteúdo.
 *
 * @param {string} markdown - O texto em Markdown para converter.
 * @returns {Block[]} Retorna uma lista de blocos de conteúdo.
 */
export declare const markdownToContent: (markdown: string) => Block[];
export {};
