import { Access, FieldAccess } from 'payload/types';
import { UserType } from '../types/UserType';
export declare const isAdmin: Access<any, UserType>;
export declare const isAdminFieldLevel: FieldAccess<{
    id: string;
}, unknown, UserType>;
