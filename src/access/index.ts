/**
 * Centralizado de reexportação de verificações de acesso.
 *
 * Este arquivo atua como um ponto de entrada único para todas as funções relacionadas
 * a verificações de acesso, permitindo importações mais limpas em outros lugares
 * do projeto.
 *
 * @module access
 */
export * from './isAdmin';
export * from './isAuthenticated';
export * from './isEditor';
