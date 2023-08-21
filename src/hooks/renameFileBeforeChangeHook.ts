import { CollectionBeforeChangeHook } from 'payload/types';
import { format } from '../utilities/formatSlug';

export const renameFileBeforeChangeHook: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
  context,
}) => {
  console.log('data', data);
  if (operation === 'create' && data.filename) {
    data.filename = format(data.filename);
  }
  return data;
};
