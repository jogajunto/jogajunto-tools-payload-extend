import { CollectionBeforeChangeHook } from 'payload/types';
import { format } from '../utilities/formatSlug';

export const renameFileBeforeChangeHook = (): CollectionBeforeChangeHook => {
  return async ({
    data, // incoming data to update or create with
    req, // full express request
    operation, // name of the operation ie. 'create', 'update'
    originalDoc, // original document
  }) => {
    console.log('data', data);
    return data;
  };
};
