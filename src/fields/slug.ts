import { Field } from 'payload/types';
import formatSlug from '../utilities/formatSlug';

const slug: Field = {
  name: 'slug',
  label: 'Slug',
  type: 'text',
  admin: {
    position: 'sidebar',
    description: 'Slug gerado de forma automática ao salvar o post',
  },
  hooks: {
    beforeValidate: [formatSlug('title')],
  },
  unique: true,
};

export const createSlugField = (fieldParam: string): Field => ({
  ...slug,
  hooks: {
    beforeValidate: [formatSlug(fieldParam)],
  },
});

export default slug;
