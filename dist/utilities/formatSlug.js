"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const format = (val) => removeAccents(val)
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();
const formatSlug = (fallback) => ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
        return format(value);
    }
    const fallbackData = (data && data[fallback]) || (originalDoc && originalDoc[fallback]);
    if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData);
    }
    return value;
};
exports.default = formatSlug;
