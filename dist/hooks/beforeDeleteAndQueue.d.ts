/**
 * @module hooks/beforeDeleteAndQueue
 * @description Este módulo fornece um hook para ser utilizado antes da deleção de um
 * documento em uma coleção no Payload CMS. O hook permite adicionar o documento a uma
 * fila para processamento posterior, o que é útil para casos em que ações adicionais
 * devem ser executadas após a deleção de um documento, como notificações, logs ou
 * operações em outros sistemas.
 */
import { CollectionBeforeDeleteHook } from 'payload/types';
import { CollectionName, FormatterCollection } from '../types';
/**
 * Função que é executada antes da deleção de um documento em uma coleção.
 * Quando um documento é deletado, ele é adicionado a uma fila para processamento posterior.
 *
 * @param {string} collectionName - Nome da coleção em que o documento está.
 * @param {string} directoryRepository - Diretório do repositório de dados.
 * @param {Record<CollectionName, FormatterCollection>} collectionFormatters - Formatters associados às coleções.
 * @returns {CollectionBeforeDeleteHook} Um hook a ser utilizado antes da deleção de um documento em uma coleção.
 */
export declare const beforeDeleteAndQueue: (collectionName: string, directoryRepository: string, collectionFormatters: Record<CollectionName, FormatterCollection>) => CollectionBeforeDeleteHook;
