import { EmbedField } from './EmbedField';

export type EmbedData = {
  title?: string;
  description?: string;
  url?: string;
  color?: string;
  timestamp?: Date | string;
  footer?: {
    icon_url?: string;
    text?: string;
  };
  thumbnail?: {
    url: string;
  };
  image?: {
    url: string;
  };
  author?: {
    name?: string;
    url?: string;
    icon_url?: string;
  };
  fields?: EmbedField[];
};
