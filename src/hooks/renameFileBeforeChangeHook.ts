import { GlobalBeforeChangeHook } from 'payload/types';
import { format } from '../utilities/formatSlug';

export const renameFileBeforeChangeHook: GlobalBeforeChangeHook = async ({
  data,
  req,
  originalDoc,
}) => {
  console.log('data', data);
  return data;
};
