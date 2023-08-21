"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = __importDefault(require("js-yaml"));
const lodash_1 = __importDefault(require("lodash"));
const formatMarkdown = (doc, collectionName, payload, formatters) => __awaiter(void 0, void 0, void 0, function* () {
    const dataFormatter = formatters[collectionName];
    if (!dataFormatter) {
        throw new Error(`Formatter for collection "${collectionName}" not found.`);
    }
    const data = yield dataFormatter(doc, payload);
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
                    const mediaFile = yield payload.findByID({
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
                block.children.forEach((listItem) => {
                    content += '- ';
                    listItem.children.forEach((child) => {
                        let text = child.text;
                        if (child.bold) {
                            text = `**${text}**`;
                        }
                        if (child.italic) {
                            text = `_${text}_`;
                        }
                        if (child.type === 'link') {
                            child.children.forEach((linkChild) => {
                                text = `[${linkChild.text}](${child.url})`;
                            });
                        }
                        content += lodash_1.default.trim(text, '\n');
                    });
                    content += '\n';
                });
                break;
            default:
                if (block.children.text != '') {
                    // Block type any
                    block.children.forEach((child) => {
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
                        content += lodash_1.default.trim(text, '\n');
                    });
                    if (block.children.length > 0) {
                        content += '\n\n'; // Add two newlines to create a new paragraph in Markdown
                    }
                }
                break;
        }
    }
    const yamlText = js_yaml_1.default.dump(data);
    const fileContent = `---\n${yamlText}---\n${content}`;
    return fileContent;
});
exports.default = formatMarkdown;
