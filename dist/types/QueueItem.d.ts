import { CollectionName } from './CollectionName';
import { FormatterCollection } from './FormatterCollection';
import { Document } from 'payload/types';
export interface QueueItem {
    collection: string;
    id: string | number;
    document: Document;
    operation: 'delete' | 'create' | 'update';
    directoryRepository: string;
    collectionFormatters: Record<CollectionName, FormatterCollection>;
}
