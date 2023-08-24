import { Document } from 'payload/types';
import { CollectionName, FormatterCollection } from '../types';
interface QueueItem {
    collection: string;
    id: string | number;
    document: Document;
    operation: 'delete' | 'create' | 'update';
    directoryRepository: string;
    collectionFormatters: Record<CollectionName, FormatterCollection>;
}
export declare const itemIsInQueue: (id: string | number) => boolean;
export declare const addToQueue: (collection: string, id: string | number, document: Document, operation: 'delete' | 'create' | 'update', directoryRepository: string, collectionFormatters: Record<CollectionName, FormatterCollection>) => void;
export declare const removeFromQueue: (collection: string, id: string | number) => void;
export declare const getQueue: () => QueueItem[];
export declare const sendOperationFromGithub: (task: QueueItem) => Promise<void>;
export declare const processQueue: () => Promise<void>;
export {};
