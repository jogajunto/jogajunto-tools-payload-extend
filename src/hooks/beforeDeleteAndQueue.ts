import payload from 'payload';
import { CollectionBeforeDeleteHook } from 'payload/types';
import { addToQueue } from '../queue/queueManagerMemory';
import { CollectionName, FormatterCollection } from '../types';

export const beforeDeleteHook = (
  collectionName: string,
  directoryRepository: string,
  collectionFormatters: Record<CollectionName, FormatterCollection>
): CollectionBeforeDeleteHook => {
  return async ({ req, id }) => {
    const document = await payload.findByID({
      collection: collectionName,
      id: id,
    });
    addToQueue(
      collectionName,
      id,
      document,
      'delete',
      directoryRepository,
      collectionFormatters
    );
  };
};
