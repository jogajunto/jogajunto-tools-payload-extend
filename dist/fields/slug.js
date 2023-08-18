"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlugField = exports.slug = void 0;
const formatSlug_1 = __importDefault(require("../utilities/formatSlug"));
/**
 * Representa o campo "slug".
 */
exports.slug = {
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
const createSlugField = (fieldParam) => (Object.assign(Object.assign({}, exports.slug), { hooks: {
        beforeValidate: [(0, formatSlug_1.default)(fieldParam)],
    } }));
exports.createSlugField = createSlugField;
