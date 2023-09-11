import { isAdmin, isAdminFieldLevel } from '../../access/isAdmin';
import { CollectionConfig } from 'payload/types';
import isNewUserForToken from '../../access/isNewUserForToken';
import TokenGenerator from '../components/TokenGenerator';

const TokenNewUsers: CollectionConfig = {
  slug: 'tokennewusers',
  labels: {
    singular: 'Token de Novo Usuário',
    plural: 'Tokens para Novos Usuários',
  },
  access: {
    create: isAdmin,
    read: isAdmin ?? isNewUserForToken,
  },
  admin: {
    useAsTitle: 'id',
    disableDuplicate: true,
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'token',
      label: 'Token JWT',
      type: 'text',
      required: true,
      unique: true,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        description: 'Gere um token para um link de cadastro',
        components: {
          Field: TokenGenerator,
        },
      },
    },
    {
      name: 'used',
      type: 'checkbox',
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default TokenNewUsers;
