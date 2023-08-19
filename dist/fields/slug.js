"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlugField = void 0;
var formatSlug_1 = __importDefault(require("../utilities/formatSlug"));
/**
 * Representa o campo "slug".
 */
var slug = {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    admin: {
        position: 'sidebar',
        description: 'Slug gerado de forma automática ao salvar o post',
    },
    hooks: {
        beforeValidate: [(0, formatSlug_1.default)('title')],
    },
    unique: true,
};
/**
 * Cria uma variação do campo "slug", com um gatilho customizado para formatação.
 * @param fieldParam O campo utilizado como base para formatação do slug.
 * @returns Uma definição de campo "slug" customizada.
 */
var createSlugField = function (fieldParam) { return (__assign(__assign({}, slug), { hooks: {
        beforeValidate: [(0, formatSlug_1.default)(fieldParam)],
    } })); };
exports.createSlugField = createSlugField;
