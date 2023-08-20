/**
 * Hook para lidar com doc que são apenas mídia com um nome/slug
 */
import { CollectionAfterChangeHook } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
declare const mediaAfterChange: (collectionName: CollectionName, directory: string) => CollectionAfterChangeHook;
export default mediaAfterChange;
