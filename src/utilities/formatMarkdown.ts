import yaml from 'js-yaml';
import _ from 'lodash';
import { Document } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
import { Payload } from 'payload';
import { FormatterCollection } from '../types/FormatterCollection';

const formatMarkdownText = (child: any): string => {
  let text = child.text;

  if (child.bold) {
    text = `**${text}**`;
  }

  if (child.italic) {
    text = `_${text}_`;
  }

  if (child.strikethrough) {
    text = `~~${text}~~`;
  }

  if (child.code) {
    text = '```' + text + '```';
  }

  // Note: Underline não é padrão em Markdown, mas pode ser usado <u> tag HTML.
  if (child.underline) {
    text = `<u>${text}</u>`;
  }

  return text;
};

const handleLink = (child: any): string => {
  let text = '';

  if (Array.isArray(child.children)) {
    child.children.forEach((linkChild: any) => {
      let linkText = formatMarkdownText(linkChild);
      text += `[${linkText}](${child.url})`;
    });
  }

  return text;
};

/**
 * Formata os blocos de tipo cabeçalho (h1-h6).
 * @param block - O bloco a ser processado.
 * @param markdownTag - A tag markdown correspondente.
 * @returns O texto formatado.
 */
const handleHeader = (block: any, markdownTag: string): string => {
  if (block.children && block.children[0] && block.children[0].text) {
    return `${markdownTag} ${block.children[0].text}\n\n`;
  }
  console.log(`Error: Invalid header block format: ${JSON.stringify(block)}`);
  return '';
};

/**
 * Processa um bloco do tipo lista não ordenada (ul).
 * @param block - O bloco a ser processado.
 * @returns O texto formatado.
 */
const handleUnorderedList = (block: any): string => {
  let content = '';

  if (Array.isArray(block.children)) {
    block.children.forEach((listItem: any) => {
      let listItemContent = '- ';

      if (listItem.children && Array.isArray(listItem.children)) {
        listItem.children.forEach((child: any) => {
          if (child.type === 'link') {
            listItemContent += handleLink(child);
          } else {
            listItemContent += formatMarkdownText(child);
          }
        });
      }

      content += `${listItemContent}\n`;
    });
  }

  return content;
};

/**
 * Processa um bloco do tipo lista ordenada (ol).
 * @param block - O bloco a ser processado.
 * @returns O texto formatado.
 */
const handleOrderedList = (block: any): string => {
  let content = '';

  if (Array.isArray(block.children)) {
    block.children.forEach((listItem: any, index: number) => {
      let listItemContent = `${index + 1}. `;

      if (listItem.children && Array.isArray(listItem.children)) {
        listItem.children.forEach((child: any) => {
          if (child.children) {
            child.children.array.forEach((child: any) => {
              if (child.type === 'link') {
                listItemContent += handleLink(child);
              } else {
                listItemContent += formatMarkdownText(child);
              }
            });
          } else {
            if (child.type === 'link') {
              listItemContent += handleLink(child);
            } else {
              listItemContent += formatMarkdownText(child);
            }
          }
        });
      }

      content += `${listItemContent}\n`;
    });
  }

  return content;
};

/**
 * Formata blocos de tipo blockquote.
 * @param block - O bloco a ser processado.
 * @returns O texto formatado.
 */
const handleBlockquote = (block: any): string => {
  if (block.children && block.children[0] && block.children[0].text) {
    return `> ${block.children[0].text}\n\n`;
  }
  console.log(
    `Error: Invalid blockquote block format: ${JSON.stringify(block)}`
  );
  return '';
};

/**
 * Processa o bloco de upload, recuperando a URL da imagem e criando a tag de imagem markdown.
 * @param block - O bloco a ser processado.
 * @param payload - Instância do Payload para consultas.
 * @returns O texto formatado.
 */
const handleUpload = async (block: any, payload: Payload): Promise<string> => {
  if (block.value?.id) {
    const mediaFile = await payload.findByID({
      collection: 'media',
      id: block.value.id,
    });
    if (mediaFile) {
      return `![${mediaFile.filename}](${mediaFile.url})\n`;
    }
  }
  console.log(`Error: Invalid upload block format: ${JSON.stringify(block)}`);
  return '';
};

/**
 * Formata blocos de outros tipos.
 * @param block - O bloco a ser processado.
 * @returns O texto formatado.
 */
const handleDefault = (block: any): string => {
  let content = '';

  if (block.children) {
    block.children.forEach((child: any) => {
      if (child.type === 'link') {
        content += handleLink(child);
      } else {
        content += formatMarkdownText(child);
      }
    });

    if (block.children.length > 0) {
      content += '\n\n'; // Add two newlines to create a new paragraph in Markdown
    }
  }

  return content;
};

/**
 * Função principal para formatar o conteúdo em markdown.
 * @param doc - Documento a ser formatado.
 * @param collectionName - Nome da coleção.
 * @param payload - Instância do Payload para consultas.
 * @param formatters - Mapeamento de formatters.
 * @returns O documento formatado.
 */
const formatMarkdown = async (
  doc: Document,
  collectionName: CollectionName,
  payload: Payload,
  formatters: Record<CollectionName, FormatterCollection>
) => {
  const dataFormatter = formatters[collectionName];
  if (!dataFormatter) {
    throw new Error(`Formatter for collection "${collectionName}" not found.`);
  }

  const data = await dataFormatter(doc, payload);

  let content = '\n';

  // Processa cada bloco de conteúdo.
  if (doc.content) {
    for (const block of doc.content) {
      switch (block.type) {
        case 'h1':
          content += handleHeader(block, '#');
          break;
        case 'h2':
          content += handleHeader(block, '##');
          break;
        case 'h3':
          content += handleHeader(block, '###');
          break;
        case 'h4':
          content += handleHeader(block, '####');
          break;
        case 'h5':
          content += handleHeader(block, '#####');
          break;
        case 'h6':
          content += handleHeader(block, '######');
          break;

        case 'ul':
          content += handleUnorderedList(block);
          break;
        case 'ol':
          content += handleOrderedList(block);
          break;

        case 'blockquote':
          content += handleBlockquote(block);
          break;

        case 'upload':
          content += await handleUpload(block, payload);
          break;

        default:
          content += handleDefault(block);
          break;
      }
    }
  }

  // Gera o conteúdo final combinando yaml e markdown.
  const yamlText = yaml.dump(data);
  const fileContent = `---\n${yamlText}---\n${content}`;

  return fileContent;
};

export default formatMarkdown;
