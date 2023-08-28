"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlugField = void 0;
const formatSlug_1 = require("../utilities/formatSlug");
/**
 * Representa o campo "slug".
 */
const slug = {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    access: {
        update: ({ req: { user } }) => {
            return false;
        },
    },
    admin: {
        position: 'sidebar',
        description: 'Slug gerado de forma automática ao salvar o post',
    },
    hooks: {
        beforeValidate: [(0, formatSlug_1.formatSlug)('title')],
    },
    unique: true,
};
/**
 * Cria uma variação do campo "slug", com um gatilho customizado para formatação.
 * @param fieldParam O campo utilizado como base para formatação do slug.
 * @returns Uma definição de campo "slug" customizada.
 */
const createSlugField = (fieldParam) => ({
    ...slug,
    hooks: {
        beforeValidate: [(0, formatSlug_1.formatSlug)(fieldParam)],
    },
});
exports.createSlugField = createSlugField;
