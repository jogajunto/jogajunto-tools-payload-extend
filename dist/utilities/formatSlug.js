"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSlugString = exports.formatSlug = exports.format = exports.removeAccents = void 0;
const removeAccents = (str) => {
    const accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
    const accentsOut = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
    return str
        .split('')
        .map((letter, index) => {
        const accentIndex = accents.indexOf(letter);
        return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
    })
        .join('');
};
exports.removeAccents = removeAccents;
const format = (val) => (0, exports.removeAccents)(val)
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();
exports.format = format;
const formatSlug = (fallback) => ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
        return (0, exports.format)(value);
    }
    const fallbackData = (data && data[fallback]) || (originalDoc && originalDoc[fallback]);
    if (fallbackData && typeof fallbackData === 'string') {
        return (0, exports.format)(fallbackData);
    }
    return value;
};
exports.formatSlug = formatSlug;
const formatSlugString = (val) => {
    return (0, exports.format)(val);
};
exports.formatSlugString = formatSlugString;
