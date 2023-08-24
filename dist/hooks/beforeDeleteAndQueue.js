"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beforeDeleteHook = void 0;
const payload_1 = __importDefault(require("payload"));
const queueManagerMemory_1 = require("../queue/queueManagerMemory");
const beforeDeleteHook = (collectionName, directoryRepository, collectionFormatters) => {
    return async ({ req, id }) => {
        const document = await payload_1.default.findByID({
            collection: collectionName,
            id: id,
        });
        (0, queueManagerMemory_1.addToQueue)(collectionName, id, document, 'delete', directoryRepository, collectionFormatters);
    };
};
exports.beforeDeleteHook = beforeDeleteHook;
