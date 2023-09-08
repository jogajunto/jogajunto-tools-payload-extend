import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useConfig, useAuth } from 'payload/components/utilities';
import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal';
import Form from 'payload/dist/admin/components/forms/Form';
import Email from 'payload/dist/admin/components/forms/field-types/Email';
import Password from 'payload/dist/admin/components/forms/field-types/Password';
import Text from 'payload/dist/admin/components/forms/field-types/Text';
import ConfirmPassword from 'payload/dist/admin/components/forms/field-types/ConfirmPassword';
import HiddenInput from 'payload/dist/admin/components/forms/field-types/HiddenInput';
import Submit from 'payload/dist/admin/components/forms/Submit';
import { AdminView } from 'payload/config';
import { UserType } from '../../../types/UserType';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NewUser: AdminView = () => {
  const config = useConfig();
  const {
    admin: { user: userSlug, logoutRoute },
    serverURL,
    routes: { admin, api },
  } = config;
  const query = useQuery();
  const token: string = query.get('token') ?? 'token_where';
  const { t } = useTranslation('authentication');
  const [validToken, setValidToken] = useState(false);
  const [newEmailUser, setNewEmailUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [createdUser, setCreatedUser] = useState(false);
  const authentication = useAuth();

  useEffect(() => {
    validateToken();
  });

  const validateToken = async () => {
    /**
     * Validar o token na collection TokenNewUsers.ts
     *
     * Se o token for válido a gente mostra o form para fazer o cadastro
     * Se não ele joga para não autorizado
     */
    try {
      const response = await fetch(`/validate-jsonwebtoken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if (authentication.user) {
          setValidToken(false);
          setLoading(false);
        } else {
          setValidToken(true);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(t(errorMessage));
    }
  };

  const onSuccess = async (data: UserType | any) => {
    try {
      if (data.doc?.id) {
        /**
         * Invalidate token after used
         */
        const invalidToken = await fetch('/set-used-jsonwebtoken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
          }),
        });
        /**
         * setNewEmailUser seta o email do usuário criado
         */
        setNewEmailUser(data.doc.email);
        /**
         * Informa que um usuário foi criado
         */
        setCreatedUser(true);
      }
    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(t(errorMessage));
    }
  };

  return (
    <MinimalTemplate>
      {validToken && !createdUser ? (
        <div>
          <h1>Cadastre-se</h1>
          <p>Preencha com seus dados para cadastrar uma nova conta.</p>
          <Form
            onSuccess={onSuccess}
            method='post'
            action={`${serverURL}/api/users`}
          >
            <Text
              label={'Nome'}
              name='name'
              required={true}
              admin={{
                description: 'Insira o seu nome completo',
              }}
            />
            <Email
              label={'Email'}
              name={'email'}
              required={true}
              admin={{
                description: 'Insira o endereço de e-mail para a sua conta',
              }}
            />
            <Password
              label={t('newPassword')}
              name='password'
              autoComplete='off'
              required={true}
            />
            <ConfirmPassword />
            <HiddenInput name='token' value={token} />
            <Submit>{t('Cadastre-se')}</Submit>
          </Form>
        </div>
      ) : (
        !validToken &&
        !loading &&
        !createdUser && <Redirect to={`${admin}/unauthorized`} />
      )}
      {createdUser && (
        <div>
          <h1>Usuário criado com sucesso!</h1>
          <p>
            Por favor, verifique o email enviado para <b>{newEmailUser}</b>
          </p>
        </div>
      )}
    </MinimalTemplate>
  );
};

export default NewUser;
