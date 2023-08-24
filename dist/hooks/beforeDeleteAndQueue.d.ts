import { CollectionBeforeDeleteHook } from 'payload/types';
import { CollectionName, FormatterCollection } from '../types';
export declare const beforeDeleteAndQueue: (collectionName: string, directoryRepository: string, collectionFormatters: Record<CollectionName, FormatterCollection>) => CollectionBeforeDeleteHook;
