import { CollectionBeforeChangeHook } from 'payload/types';

export const disableUpdateEmail: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
  originalDoc,
}) => {
  if (
    operation === 'update' &&
    data.email &&
    data.email !== originalDoc.email
  ) {
    throw new Error('Não é possível alterar seu e-mail.');
  }
  return data;
};
