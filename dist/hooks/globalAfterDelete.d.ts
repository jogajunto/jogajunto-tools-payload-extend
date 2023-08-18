import { CollectionAfterDeleteHook } from 'payload/types';
declare const globalAfterDelete: (collectionName: string, directory: string) => CollectionAfterDeleteHook;
export default globalAfterDelete;
