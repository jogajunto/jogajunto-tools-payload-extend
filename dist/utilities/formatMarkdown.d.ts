import { Document } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
import { Payload } from 'payload';
declare const formatMarkdown: (doc: Document, collectionName: CollectionName, payload: Payload, formatters: Object) => Promise<string>;
export default formatMarkdown;
