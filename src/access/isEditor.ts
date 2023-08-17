import { Access } from 'payload/types';
import { UserType } from '../types/UserType';

export const isEditorOrOwnsDocument: Access<any, UserType> = ({ req }) => {
  const user = req.user;

  // Se o usuário tiver o papel de 'admin', conceder acesso total
  if (Boolean(user?.roles?.includes('admin'))) return true;

  // Se o usuário tiver o papel de 'editor', restringir a consulta para incluir apenas o próprio usuário
  if (Boolean(user?.roles?.includes('editor'))) {
    return {
      id: {
        equals: user.id,
      },
    };
  }

  // Para outros casos, negar acesso
  return false;
};

export const isEditor: Access<any, UserType> = ({ req }) => {
  return Boolean(req.user?.roles?.includes('editor'));
};
