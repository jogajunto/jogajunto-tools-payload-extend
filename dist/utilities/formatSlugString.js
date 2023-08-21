"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSlugString = void 0;
const formatSlug_1 = require("./formatSlug");
const formatSlugString = (val) => {
    return (0, formatSlug_1.format)(val);
};
exports.formatSlugString = formatSlugString;
