"use strict";
/**
 * @module utilities
 * @description Funções utilitárias e ajudantes para o projeto 'jogajunto-tools-payload-extend'.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Exportando a função utilitária para formatar conteúdo como Markdown.
 * @see module:formatMarkdown
 */
__exportStar(require("./formatMarkdown"), exports);
/**
 * Exportando funções utilitárias relacionadas à formatação de slugs.
 * @see module:formatSlug
 */
__exportStar(require("./formatSlug"), exports);
/**
 * Exportando a função utilitária para preparar imagens para o repositório.
 * @see module:prepareImageForRepository
 */
__exportStar(require("./prepareImageForRepository"), exports);
/**
 * Exportando a função utilitária para formatar uma string como slug.
 * @see module:formatSlugString
 */
__exportStar(require("./formatSlugString"), exports);
/**
 * Exportando a função utilitária para dividir nomes de arquivos.
 * @see module:splitFilename
 */
__exportStar(require("./splitFilename"), exports);
