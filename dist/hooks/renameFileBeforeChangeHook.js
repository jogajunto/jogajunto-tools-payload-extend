"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formatSlug_1 = __importDefault(require("../utilities/formatSlug"));
var format = formatSlug_1.default.format;
var renameFileBeforeChangeHook = function (_a) {
    var data = _a.data, req = _a.req, operation = _a.operation, originalDoc = _a.originalDoc, context = _a.context;
    if (operation === 'create') {
        // Se o arquivo tiver um nome (filename), então formatamos esse nome usando a função formatSlug
        if (data.filename) {
            data.filename = format(data.filename);
        }
    }
    return data;
};
exports.default = renameFileBeforeChangeHook;
