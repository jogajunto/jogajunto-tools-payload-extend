import { Field } from 'payload/types';
import { formatSlug } from '../utilities/formatSlug';

/**
 * Representa o campo "slug".
 */
const slug: Field = {
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
    beforeValidate: [formatSlug('title')],
  },
  unique: true,
};

/**
 * Cria uma variação do campo "slug", com um gatilho customizado para formatação.
 * @param fieldParam O campo utilizado como base para formatação do slug.
 * @returns Uma definição de campo "slug" customizada.
 */
export const createSlugField = (fieldParam: string): Field => ({
  ...slug,
  hooks: {
    beforeValidate: [formatSlug(fieldParam)],
  },
});
