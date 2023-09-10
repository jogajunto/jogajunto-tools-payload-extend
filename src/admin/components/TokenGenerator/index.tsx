import React, { useRef, useState, useEffect } from 'react';
import { TextInput, useField } from 'payload/components/forms';
import { useAuth } from 'payload/components/utilities';

const baseClass = 'tokenGenerator';

const TokenGenerator: React.FC<any> = ({ path, label, required }) => {
  const { value, setValue } = useField<any>({ path });
  const authentication = useAuth();
  const fieldName = path.split('.').pop();

  const generateToken = async (e: any) => {
    try {
      e.preventDefault();
      const response = await fetch(`/generate-jsonwebtoken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: authentication.user }),
      });
      const data = await response.json();
      setValue(data.token); // Aqui definimos o valor do token para o campo.
    } catch (error) {
      console.error('Erro ao gerar token:', error);
    }
  };

  return (
    <div className={baseClass}>
      <TextInput
        value={value}
        path={path}
        name={fieldName}
        label={label}
        readOnly={true}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <div className='link-new-user'>
          <strong>Envie o link de cadastro para o cliente:</strong>
          <br />
          <textarea
            name='copy-link'
            id='copy-link'
            className='textarea-element'
            style={{ width: '100%' }}
            readOnly={true}
            rows={10}
            value={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/new-user?token=${value}`}
          />
        </div>
      )}
      <button
        className='btn btn--style-primary btn--icon-style-without-border btn--size-medium btn--icon-position-right'
        id='generate-token'
        onClick={generateToken}
      >
        Gerar Token
      </button>
    </div>
  );
};

export default TokenGenerator;
