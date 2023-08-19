import { Field } from 'payload/types';
/**
 * Cria uma variação do campo "slug", com um gatilho customizado para formatação.
 * @param fieldParam O campo utilizado como base para formatação do slug.
 * @returns Uma definição de campo "slug" customizada.
 */
export declare const createSlugField: (fieldParam: string) => Field;
