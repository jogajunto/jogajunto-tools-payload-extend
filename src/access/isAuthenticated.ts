import { Access } from 'payload/types';
import { UserType } from '../types/UserType';

export const isAuthenticated: Access<any, UserType> = ({ req }) => {
  return Boolean(req.user);
};
