import { CollectionBeforeChangeHook } from 'payload/types';
import { format } from '../utilities/formatSlug';

export const renameFileBeforeChangeHook: CollectionBeforeChangeHook = () => {
  return async ({ data, req, operation, originalDoc, context }) => {
    if (operation === 'create' && data.filename) {
      data.filename = format(data.filename);
    }
    return data;
  };
};
