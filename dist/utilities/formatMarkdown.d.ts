/**
 * @module utilities/formatMarkdown
 * @description Este módulo fornece uma função principal para formatar o conteúdo de um documento em formato Markdown com blocos de metadados YAML no início.
 *
 * Principais características e funcionalidades:
 *
 * - Converte texto formatado em várias estilizações de Markdown, como negrito, itálico, riscado, código e sublinhado.
 * - Suporta a formatação de links incorporados dentro do texto.
 * - Processa blocos de cabeçalho (h1-h6) e converte-os em suas respectivas notações de Markdown.
 * - Formata listas não ordenadas (ul) e listas ordenadas (ol).
 * - Converte blocos de citação em formatação de citação Markdown.
 * - Processa blocos de upload, convertendo-os em tags de imagem de Markdown.
 * - Utiliza um conjunto de funções auxiliares para formatar cada tipo específico de bloco.
 * - Se integra com o Payload CMS, usando sua API para buscar informações adicionais, se necessário.
 * - Suporta formatação extensível através de mapeamentos de formatters.
 *
 * Este módulo é essencial para gerar arquivos em formato Markdown a partir de um conjunto de blocos estruturados.
 */
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
 * @returns {string} O documento formatado.
 */
declare const formatMarkdown: (doc: Document, collectionName: CollectionName, payload: Payload, formatters: Record<CollectionName, FormatterCollection>) => Promise<string>;
export default formatMarkdown;
