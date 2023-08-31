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

  child.children.forEach((linkChild: any) => {
    let linkText = formatMarkdownText(linkChild);
    text += `[${linkText}](${child.url})`;
  });

  return text;
};

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
  // Loop in blocks content
  if (doc.content) {
    for (const block of doc.content) {
      console.log(block.type);
      switch (block.type) {
        case 'h1': // Block type H2
          content += `# ${block.children[0].text}\n\n`;
          break;

        case 'h2': // Block type H2
          content += `## ${block.children[0].text}\n\n`;
          break;

        case 'h3': // Block type H2
          content += `### ${block.children[0].text}\n\n`;
          break;

        case 'h4': // Block type H2
          content += `#### ${block.children[0].text}\n\n`;
          break;

        case 'h5': // Block type H2
          content += `##### ${block.children[0].text}\n\n`;
          break;

        case 'h6': // Block type H2
          content += `###### ${block.children[0].text}\n\n`;
          break;

        case 'upload':
          if (block.value?.id) {
            // Block type Upload
            console.log('block_error', block);
            const idUpload = block.value.id;
            if (idUpload) {
              const mediaFile = await payload.findByID({
                collection: 'media',
                id: idUpload,
              });
              if (mediaFile) {
                const filename = mediaFile.filename;
                const urlFile = mediaFile.url;

                content += `![${filename}](${urlFile})\n`;
              }
            }
          }
          break;

        case 'ul':
          // Block type UL
          block.children.forEach((listItem: any) => {
            content += '- ';
            listItem.children.forEach((child: any) => {
              let text = child.text;

              if (child.type === 'link') {
                child.children.forEach((linkChild: any) => {
                  let linkChildText = linkChild.text;
                  if (linkChild.bold) {
                    text = `[**${linkChildText}**](${child.url})`;
                  } else if (linkChild.italic) {
                    text = `[_${linkChildText}_](${child.url})`;
                  } else if (linkChild.strikethrough) {
                    text = `[~~${linkChildText}~~](${child.url})`;
                  } else if (linkChild.underline) {
                    text = `[<u>${linkChildText}</u>](${child.url})`;
                  } else {
                    text = `[${linkChildText}](${child.url})`;
                  }
                });
              } else {
                if (child.bold) {
                  text = `**${text}**`;
                }

                if (child.italic) {
                  text = `_${text}_`;
                }

                if (child.code) {
                  text = '```' + text + '```';
                }

                if (child.strikethrough) {
                  text = `~~${text}~~`;
                }
              }

              content += _.trim(text, '\n');
            });
            content += '\n';
          });
          break;

        case 'ol':
          block.children.forEach((listItem: any, index: number) => {
            content += `${index + 1}. `;

            // Considerando a estrutura adicional
            listItem.children[0].children.forEach((child: any) => {
              if (child.type === 'link') {
                content += handleLink(child);
              } else {
                content += formatMarkdownText(child);
              }
            });

            content += '\n';
          });
          break;

        case 'blockquote':
          content += `> ${block.children[0].text}\n\n`;
          break;

        default:
          if (block.children.text != '') {
            // Block type any
            block.children.forEach((child: any) => {
              let text = child.text;

              if (child.type === 'link') {
                child.children.forEach((linkChild: any) => {
                  let linkChildText = linkChild.text;
                  if (linkChild.bold) {
                    text = `[**${linkChildText}**](${child.url})`;
                  } else if (linkChild.italic) {
                    text = `[_${linkChildText}_](${child.url})`;
                  } else if (linkChild.strikethrough) {
                    text = `[~~${linkChildText}~~](${child.url})`;
                  } else if (linkChild.underline) {
                    text = `[<u>${linkChildText}</u>](${child.url})`;
                  } else {
                    text = `[${linkChildText}](${child.url})`;
                  }
                });
              } else {
                if (child.bold) {
                  text = `**${text}**`;
                }

                if (child.italic) {
                  text = `_${text}_`;
                }

                if (child.code) {
                  text = '```' + text + '```';
                }

                if (child.strikethrough) {
                  text = `~~${text}~~`;
                }

                if (child.underline) {
                  text = `<u>${text}</u>`;
                }
              }

              content += _.trim(text, '\n');
            });

            if (block.children.length > 0) {
              content += '\n\n'; // Add two newlines to create a new paragraph in Markdown
            }
          }
          break;
      }
    }
  }

  const yamlText = yaml.dump(data);
  const fileContent = `---\n${yamlText}---\n${content}`;

  return fileContent;
};

export default formatMarkdown;
