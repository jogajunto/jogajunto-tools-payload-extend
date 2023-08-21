import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { format } from '../utilities/formatSlug';

export const renameFileBeforeChangeHook: BeforeChangeHook = () => {
  return async ({ data, req, operation, originalDoc, context }) => {
    if (operation === 'create') {
      // Se o arquivo tiver um nome (filename), então formatamos esse nome usando a função formatSlug
      if (data.filename) {
        data.filename = format(data.filename);
      }
    }
    return data;
  };
};
