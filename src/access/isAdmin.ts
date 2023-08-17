import { Access, FieldAccess } from 'payload/types';
import { UserType } from '../types/UserType';

export const isAdmin: Access<any, UserType> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin'));
};

export const isAdminFieldLevel: FieldAccess<
  { id: string },
  unknown,
  UserType
> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes('admin'));
};
