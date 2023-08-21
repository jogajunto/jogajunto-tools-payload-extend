import yaml from 'js-yaml';
import _ from 'lodash';
import { Document } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
import { Payload } from 'payload';
import { FormatterCollection } from '../types/FormatterCollection';

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
  for (const block of doc.content) {
    console.log(block.type);
    switch (block.type) {
      case 'h2': // Block type H2
        content += `## ${block.children[0].text}\n\n`;
        break;

      case 'upload':
        // Block type Upload
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
        break;

      case 'ul':
        // Block type UL
        block.children.forEach((listItem: any) => {
          content += '- ';
          listItem.children.forEach((child: any) => {
            let text = child.text;

            if (child.bold) {
              text = `**${text}**`;
            }

            if (child.italic) {
              text = `_${text}_`;
            }

            if (child.type === 'link') {
              child.children.forEach((linkChild: any) => {
                text = `[${linkChild.text}](${child.url})`;
              });
            }

            content += _.trim(text, '\n');
          });
          content += '\n';
        });
        break;

      default:
        if (block.children.text != '') {
          // Block type any
          block.children.forEach((child: any) => {
            let text = child.text;

            if (child.bold) {
              text = `**${text}**`;
            }

            if (child.type === 'link') {
              text = `[${text}](${child.url})`;
            }

            if (child.italic) {
              text = `_${text}_`;
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

  const yamlText = yaml.dump(data);
  const fileContent = `---\n${yamlText}---\n${content}`;

  return fileContent;
};

export default formatMarkdown;
