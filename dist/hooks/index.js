"use strict";
/**
 * Arquivo central de exportação para os hooks.
 *
 * Este arquivo reexporta os hooks de outros módulos, facilitando as importações
 * em outras partes do projeto ao invés de importar cada hook individualmente.
 *
 * @module hooks
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
// Reexporta o conteúdo do módulo 'globalAfterChange'
__exportStar(require("./globalAfterChange"), exports);
// Reexporta o conteúdo do módulo 'globalAfterDelete'
__exportStar(require("./globalAfterDelete"), exports);
// Reexporta o conteúdo do módulo 'mediaAfterChange'
__exportStar(require("./mediaAfterChange"), exports);
// Reexporta o conteúdo do módulo 'beforeDeleteAndQueue'
__exportStar(require("./beforeDeleteAndQueue"), exports);
// Reexporta o conteúdo do módulo 'disableUpdateEmail'
__exportStar(require("./disableUpdateEmail"), exports);
// Reexporta o conteúdo do módulo 'validatePasswords'
__exportStar(require("./validatePasswords"), exports);
