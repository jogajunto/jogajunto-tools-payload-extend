import { CollectionAfterChangeHook } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
declare const globalAfterChange: (collectionName: CollectionName, directory: string, collectionFormatters: Object, collectionUploadName?: CollectionName, directoryImage?: string) => CollectionAfterChangeHook;
export default globalAfterChange;
