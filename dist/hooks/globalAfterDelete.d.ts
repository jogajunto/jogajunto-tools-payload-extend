/**
 * @module hooks/globalAfterDelete
 * @description Este módulo fornece um hook que é executado após a exclusão
 * de um documento no Payload CMS. Este hook é responsável por preparar
 * os dados para serem enviados às Github Actions, informando sobre a
 * exclusão do documento.
 *
 * As funcionalidades principais incluem:
 * 1. Preparar os dados para informar as Github Actions sobre a exclusão.
 * 2. Enviar os dados formatados para as Github Actions.
 *
 * Este módulo é uma parte crucial para manter as Github Actions informadas
 * sobre as operações de exclusão realizadas no CMS.
 */
import { CollectionAfterDeleteHook } from 'payload/types';
/**
 * Hook para ser executado após a exclusão de um documento. Este hook prepara
 * os dados formatados para serem enviados às Github Actions informando sobre a
 * exclusão do documento.
 *
 * @param {string} collectionName - Nome da coleção que está sendo modificada.
 * @param {string} directory - Diretório que está sendo modificado.
 * @returns {CollectionAfterDeleteHook} Hook para ser usado após a exclusão de um documento.
 */
export declare const globalAfterDelete: (collectionName: string, directory: string) => CollectionAfterDeleteHook;
