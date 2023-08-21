import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import utilsSlug from '../utilities/formatSlug';

const { format } = utilsSlug;

export const renameFileBeforeChangeHook: BeforeChangeHook = ({
  data,
  req,
  operation,
  originalDoc,
  context,
}) => {
  if (operation === 'create') {
    // Se o arquivo tiver um nome (filename), então formatamos esse nome usando a função formatSlug
    if (data.filename) {
      data.filename = format(data.filename);
    }
  }
  return data;
};
