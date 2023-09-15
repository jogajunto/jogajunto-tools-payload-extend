/**
 * @module hooks/globalAfterChange
 * @description Este módulo fornece um hook que é executado após qualquer
 * mudança em um documento no Payload CMS. Este hook é responsável por
 * comparar o documento atual com o anterior, formatá-lo para markdown (se
 * houver alguma mudança), preparar a imagem (se atualizada) e, finalmente,
 * enviar os dados formatados para as Github Actions.
 *
 * As funcionalidades principais incluem:
 * 1. Comparar o documento anterior e o atual.
 * 2. Formatar o documento em markdown.
 * 3. Preparar a imagem para o repositório.
 * 4. Enviar informações formatadas para as Github Actions.
 */
import { CollectionAfterChangeHook } from 'payload/types';
import { FormatterCollection } from '../types';
import { CollectionName } from '../types/CollectionName';
/**
 * Hook para ser executado após qualquer mudança em um documento. Este hook
 * compara o documento atual com o anterior, formata para markdown se houver
 * alguma mudança, prepara a imagem se for atualizada e envia os dados
 * formatados para as Github Actions.
 *
 * @param {CollectionName} collectionName - Nome da coleção que está sendo modificada.
 * @param {string} directory - Diretório que está sendo modificado.
 * @param {Record<CollectionName, FormatterCollection>} collectionFormatters - Objeto com as funções para formatar o markdown para cada coleção.
 * @param {CollectionName} collectionUploadName - (Opcional) Nome da coleção para o upload de imagem que está sendo relacionada.
 * @param {string} directoryImage - (Opcional) Caminho do diretório da imagem.
 * @returns {CollectionAfterChangeHook} Hook para ser usado após uma mudança.
 */
export declare const globalAfterChange: (collectionName: CollectionName, directory: string, collectionFormatters: Record<CollectionName, FormatterCollection>, collectionUploadName?: CollectionName, directoryImage?: string) => CollectionAfterChangeHook;
