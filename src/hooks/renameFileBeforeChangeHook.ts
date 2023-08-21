import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { format } from '../utilities/formatSlug';

export const renameFileBeforeChangeHook: BeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
  context,
}) => {
  if (operation === 'create' && data.filename) {
    data.filename = format(data.filename);
  }
  return data;
};
