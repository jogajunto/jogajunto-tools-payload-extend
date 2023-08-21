"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameFileBeforeChangeHook = void 0;
var formatSlug_1 = require("../utilities/formatSlug");
var renameFileBeforeChangeHook = function (_a) {
    var data = _a.data, req = _a.req, operation = _a.operation, originalDoc = _a.originalDoc, context = _a.context;
    if (operation === 'create') {
        // Se o arquivo tiver um nome (filename), então formatamos esse nome usando a função formatSlug
        if (data.filename) {
            data.filename = (0, formatSlug_1.format)(data.filename);
        }
    }
    return data;
};
exports.renameFileBeforeChangeHook = renameFileBeforeChangeHook;
