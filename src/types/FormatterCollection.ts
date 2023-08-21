import { Document } from 'payload/types';
import { Payload } from 'payload';
export type FormatterCollection = (
  doc: Document,
  payload: Payload
) => Promise<string>;
