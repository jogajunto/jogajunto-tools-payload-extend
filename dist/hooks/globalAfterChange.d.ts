import { CollectionAfterChangeHook } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
export declare const globalAfterChange: (collectionName: CollectionName, directory: string, collectionFormatters: Object, collectionUploadName?: CollectionName, directoryImage?: string) => CollectionAfterChangeHook;
