import { Document } from 'payload/types';
import { CollectionName } from '../types/CollectionName';
import { Payload } from 'payload';
import { FormatterCollection } from '../types/FormatterCollection';
/**
 * Função principal para formatar o conteúdo em markdown.
 * @param doc - Documento a ser formatado.
 * @param collectionName - Nome da coleção.
 * @param payload - Instância do Payload para consultas.
 * @param formatters - Mapeamento de formatters.
 * @returns O documento formatado.
 */
declare const formatMarkdown: (doc: Document, collectionName: CollectionName, payload: Payload, formatters: Record<CollectionName, FormatterCollection>) => Promise<string>;
export default formatMarkdown;
