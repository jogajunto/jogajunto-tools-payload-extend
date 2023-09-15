/**
 * Arquivo central de exportação para os hooks.
 * 
 * Este arquivo reexporta os hooks de outros módulos, facilitando as importações
 * em outras partes do projeto ao invés de importar cada hook individualmente.
 * 
 * @module hooks
 */

// Reexporta o conteúdo do módulo 'globalAfterChange'
export * from './globalAfterChange';

// Reexporta o conteúdo do módulo 'globalAfterDelete'
export * from './globalAfterDelete';

// Reexporta o conteúdo do módulo 'mediaAfterChange'
export * from './mediaAfterChange';

// Reexporta o conteúdo do módulo 'beforeDeleteAndQueue'
export * from './beforeDeleteAndQueue';

// Reexporta o conteúdo do módulo 'disableUpdateEmail'
export * from './disableUpdateEmail';

// Reexporta o conteúdo do módulo 'validatePasswords'
export * from './validatePasswords';
