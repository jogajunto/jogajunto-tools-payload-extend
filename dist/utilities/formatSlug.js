"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var removeAccents = function (str) {
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ';
    var accentsOut = 'AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn';
    return str
        .split('')
        .map(function (letter, index) {
        var accentIndex = accents.indexOf(letter);
        return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
    })
        .join('');
};
var format = function (val) {
    return removeAccents(val)
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase();
};
var formatSlug = function (fallback) {
    return function (_a) {
        var value = _a.value, originalDoc = _a.originalDoc, data = _a.data;
        if (typeof value === 'string') {
            return format(value);
        }
        var fallbackData = (data && data[fallback]) || (originalDoc && originalDoc[fallback]);
        if (fallbackData && typeof fallbackData === 'string') {
            return format(fallbackData);
        }
        return value;
    };
};
exports.default = {
    formatSlug: formatSlug,
    format: format,
    removeAccents: removeAccents,
};
