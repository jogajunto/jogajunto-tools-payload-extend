import { CollectionBeforeDeleteHook } from 'payload/types';
import { CollectionName, FormatterCollection } from '../types';
export declare const beforeDeleteHook: (collectionName: string, directoryRepository: string, collectionFormatters: Record<CollectionName, FormatterCollection>) => CollectionBeforeDeleteHook;
