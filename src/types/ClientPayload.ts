// Definição dos tipos para a payload do cliente
export interface ClientPayload {
  slug: string;
  operation: string;
  directory: string;
  content: string;
  directory_image?: string;
  image?: string;
  image_extension?: string;
  image_filename?: string;
}
