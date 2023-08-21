import { CollectionName } from './CollectionName';
import { FormatterCollection } from './FormatterCollection';
export type FormatterRecord<T extends CollectionName> = Record<T, FormatterCollection>;
