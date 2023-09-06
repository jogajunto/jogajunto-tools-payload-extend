"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownToContent = void 0;
const marked_1 = __importDefault(require("marked"));
function checkFirstChar(str) {
    // Verifica se o primeiro caractere é ., ,, ;, :, ! ou ?
    const regex = /^[.,;:!?]/;
    return regex.test(str);
}
const handleChildTokens = (childToken, formatting = {}) => {
    const result = [];
    for (let i = 0; childToken.tokens && i < childToken.tokens.length; i++) {
        const token = childToken.tokens[i];
        if (token.type === 'link') {
            const linkChild = {
                type: 'link',
                linkType: 'custom',
                url: token.href,
                newTab: true,
                children: [
                    {
                        text: token.text || '',
                        ...formatting, // Aplicar formatação ao texto do link
                    },
                ],
            };
            result.push(linkChild);
            // Verifique o próximo token após o link
            if (i < childToken.tokens.length - 1) {
                const nextToken = childToken.tokens[i + 1];
                // Se o próximo token for texto e não começar com ',' ou '.', adicione espaço
                if (nextToken.type === 'text' && !/^[,.]/.test(nextToken.text)) {
                    result.push({ text: ' ' });
                }
            }
        }
        else if (token.tokens && token.tokens.length > 0) {
            result.push(...handleChildTokens(token, formatting));
        }
        else {
            // Modificação aqui para lidar com TextChild vazio
            let textToAdd = token.text;
            if (textToAdd === '') {
                textToAdd = '\n';
            }
            result.push({ text: textToAdd, ...formatting });
        }
    }
    if (result.length > 0) {
        const lastItem = result[result.length - 1];
        if ('text' in lastItem && !lastItem.text.trim() && lastItem.text !== '\n') {
            result.pop();
        }
    }
    return result;
};
const markdownToContent = (markdown) => {
    // Usar o 'marked' para transformar o Markdown em tokens
    const tokens = marked_1.default.lexer(markdown);
    const content = [];
    tokens.forEach((token) => {
        switch (token.type) {
            case 'heading':
                const headingTypes = [
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                ];
                const headingType = headingTypes[token.depth - 1];
                if (headingType) {
                    content.push({
                        type: headingType,
                        children: [{ text: token.text }],
                    });
                }
                break;
            case 'image':
                content.push({
                    type: 'upload',
                    value: { id: token.href },
                    children: [],
                });
                break;
            case 'list':
                const listType = token.ordered ? 'ol' : 'ul';
                const listItems = token.items.map((item) => {
                    const listItemChildren = [];
                    if (item.tokens && item.tokens.length > 0) {
                        item.tokens.forEach((childToken) => {
                            // Utilize a mesma lógica do `case 'paragraph'` para processar os child tokens
                            listItemChildren.push(...handleChildTokens(childToken));
                        });
                    }
                    else {
                        listItemChildren.push({ text: item.text });
                    }
                    return {
                        type: 'li',
                        children: listItemChildren,
                    };
                });
                content.push({
                    type: listType,
                    children: listItems,
                });
                break;
            case 'blockquote':
                content.push({
                    type: 'blockquote',
                    children: [{ text: token.text }],
                });
                break;
            case 'link':
                console.log('link > token', token);
                content.push({
                    children: [
                        {
                            type: 'link',
                            linkType: 'custom',
                            url: token.href,
                            newTab: true,
                            children: [{ text: token.text }],
                        },
                    ],
                });
                break;
            case 'paragraph':
                const paragraphChildren = [];
                token.tokens.forEach((childToken, index) => {
                    // Se o token filho for um texto com múltiplos parágrafos
                    if (childToken.type === 'text') {
                        const paragraphs = childToken.text.split('\n'); // Dividindo o texto em parágrafos
                        paragraphs.forEach((paragraph) => {
                            const child = { text: paragraph.trim() };
                            paragraphChildren.push(child);
                        });
                    }
                    // Se o token filho for um link
                    else if (childToken.type === 'link') {
                        const linkChild = {
                            type: 'link',
                            linkType: 'custom',
                            url: childToken.href,
                            newTab: true,
                            children: [{ text: childToken.text || '' }],
                        };
                        paragraphChildren.push(linkChild);
                    }
                    else {
                        let formatting = {};
                        if (childToken.type === 'strong') {
                            formatting.bold = true;
                        }
                        if (childToken.type === 'em') {
                            formatting.italic = true;
                        }
                        if (childToken.type === 'codespan') {
                            formatting.code = true;
                        }
                        if (childToken.type === 'del') {
                            formatting.strikethrough = true;
                        }
                        paragraphChildren.push(...handleChildTokens(childToken, formatting));
                    }
                });
                content.push({
                    children: paragraphChildren,
                });
                break;
            // ... outros casos conforme necessário
            default:
                // Lógica padrão para outros tipos de blocos
                content.push({
                    type: token.type,
                    children: [{ text: token.text }],
                });
                break;
        }
    });
    return content;
};
exports.markdownToContent = markdownToContent;
