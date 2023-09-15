/**
 * @module utilities/markdownToContent
 * @description Converte Markdown para um formato de conteúdo customizado.
 */

import marked from 'marked';

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
type Block =
  | {
      type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'indent';
      children: TextChild[];
    }
  | { type: 'ul' | 'ol'; children: ListItem[] }
  | { type: 'upload'; value: { id: string }; children: [] }
  | { children: (TextChild | LinkChild)[] };

/**
 * Verifica se o primeiro caractere da string é ., ,, ;, :, ! ou ?.
 * 
 * @param {string} str - A string para verificar.
 * @returns {boolean} Retorna verdadeiro se o primeiro caractere for um dos caracteres especificados.
 */
function checkFirstChar(str: string) {
  // Verifica se o primeiro caractere é ., ,, ;, :, ! ou ?
  const regex = /^[.,;:!?]/;
  return regex.test(str);
}

/**
 * Processa os tokens filhos do Markdown e os converte em TextChild ou LinkChild.
 * 
 * @param {any} childToken - O token filho para processar.
 * @param {Partial<TextChild>=} formatting - Formatação adicional para aplicar.
 * @returns {(TextChild | LinkChild)[]} Retorna uma lista de TextChild ou LinkChild.
 */
const handleChildTokens = (
  childToken: any,
  formatting: Partial<TextChild> = {}
): (TextChild | LinkChild)[] => {
  const result: (TextChild | LinkChild)[] = [];

  for (let i = 0; childToken.tokens && i < childToken.tokens.length; i++) {
    const token = childToken.tokens[i];

    if (token.type === 'link') {
      const linkChild: LinkChild = {
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
    } else if (token.tokens && token.tokens.length > 0) {
      result.push(...handleChildTokens(token, formatting));
    } else {
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

/**
 * Converte uma string Markdown em uma lista de blocos de conteúdo.
 * 
 * @param {string} markdown - O texto em Markdown para converter.
 * @returns {Block[]} Retorna uma lista de blocos de conteúdo.
 */
export const markdownToContent = (markdown: string): Block[] => {
  // Usar o 'marked' para transformar o Markdown em tokens
  const tokens = marked.lexer(markdown);

  const content: Block[] = [];

  tokens.forEach((token: any) => {
    switch (token.type) {
      case 'heading':
        const headingTypes: ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6')[] = [
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
            type: headingType as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
            children: [{ text: token.text }],
          });
        }
        break;

      case 'image':
        content.push({
          type: 'upload',
          value: { id: token.href }, // Isso pode precisar de mais lógica dependendo da estrutura exata do seu documento
          children: [],
        });
        break;

      case 'list':
        const listType = token.ordered ? 'ol' : 'ul';
        const listItems: ListItem[] = token.items.map((item: any) => {
          const listItemChildren: (TextChild | LinkChild)[] = [];

          if (item.tokens && item.tokens.length > 0) {
            item.tokens.forEach((childToken: any) => {
              // Utilize a mesma lógica do `case 'paragraph'` para processar os child tokens
              listItemChildren.push(...handleChildTokens(childToken));
            });
          } else {
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
              newTab: true, // sempre assume true; modifique se necessário
              children: [{ text: token.text }],
            },
          ],
        });
        break;

      case 'paragraph':
        const paragraphChildren: (TextChild | LinkChild)[] = [];

        token.tokens.forEach((childToken: any, index: number) => {
          // Se o token filho for um texto com múltiplos parágrafos
          if (childToken.type === 'text') {
            const paragraphs = childToken.text.split('\n'); // Dividindo o texto em parágrafos
            paragraphs.forEach((paragraph: string) => {
              const child: TextChild = { text: paragraph.trim() };
              paragraphChildren.push(child);
            });
          }
          // Se o token filho for um link
          else if (childToken.type === 'link') {
            const linkChild: LinkChild = {
              type: 'link',
              linkType: 'custom',
              url: childToken.href,
              newTab: true,
              children: [{ text: childToken.text || '' }],
            };
            paragraphChildren.push(linkChild);
          } else {
            let formatting: Partial<TextChild> = {};

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

            paragraphChildren.push(
              ...handleChildTokens(childToken, formatting)
            );
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
          type: token.type, // Supondo que o tipo de token se alinha com o tipo de bloco
          children: [{ text: token.text }],
        });
        break;
    }
  });

  return content;
};
