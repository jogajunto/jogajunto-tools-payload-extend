"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSlug = exports.format = exports.removeAccents = void 0;
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
exports.removeAccents = removeAccents;
var format = function (val) {
    return (0, exports.removeAccents)(val)
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase();
};
exports.format = format;
var formatSlug = function (fallback) {
    return function (_a) {
        var value = _a.value, originalDoc = _a.originalDoc, data = _a.data;
        if (typeof value === 'string') {
            return (0, exports.format)(value);
        }
        var fallbackData = (data && data[fallback]) || (originalDoc && originalDoc[fallback]);
        if (fallbackData && typeof fallbackData === 'string') {
            return (0, exports.format)(fallbackData);
        }
        return value;
    };
};
exports.formatSlug = formatSlug;
