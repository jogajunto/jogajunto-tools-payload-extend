import { Document } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
import { Payload } from 'payload';
import { FormatterCollection } from '../types/FormatterCollection';
declare const formatMarkdown: (doc: Document, collectionName: CollectionName, payload: Payload, formatters: Record<CollectionName, FormatterCollection>) => Promise<string>;
export default formatMarkdown;
