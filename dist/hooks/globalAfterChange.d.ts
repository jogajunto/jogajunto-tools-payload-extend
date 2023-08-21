import { CollectionAfterChangeHook } from 'payload/types';
import { FormatterCollection } from '../types';
import { CollectionName } from '../types/CollectionName';
export declare const globalAfterChange: (collectionName: CollectionName, directory: string, collectionFormatters: Record<CollectionName, FormatterCollection>, collectionUploadName?: CollectionName, directoryImage?: string) => CollectionAfterChangeHook;
