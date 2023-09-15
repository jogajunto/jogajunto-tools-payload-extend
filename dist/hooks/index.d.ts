/**
 * Arquivo central de exportação para os hooks.
 *
 * Este arquivo reexporta os hooks de outros módulos, facilitando as importações
 * em outras partes do projeto ao invés de importar cada hook individualmente.
 *
 * @module hooks
 */
export * from './globalAfterChange';
export * from './globalAfterDelete';
export * from './mediaAfterChange';
export * from './beforeDeleteAndQueue';
export * from './disableUpdateEmail';
export * from './validatePasswords';
