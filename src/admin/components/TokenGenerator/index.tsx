import React, { useRef, useState, useEffect } from 'react';
import { TextInput, useField } from 'payload/components/forms';
import { useAuth } from 'payload/components/utilities';
import { toast } from 'react-toastify';

// Classe base para o estilo do componente
const baseClass = 'tokenGenerator';

/**
 * Função para copiar texto para a área de transferência do usuário.
 * Apresenta uma notificação caso a operação seja bem-sucedida.
 * 
 * @param {string} text - O texto a ser copiado.
 */
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.info('Link copiado!');
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
}

/**
 * Função de auxílio para copiar o link para a área de transferência quando um evento é disparado.
 * 
 * @param {any} event - O evento que dispara a função.
 */
const copyLinkToClipboard = (event: any) => {
  copyToClipboard(event.target.value);
}

/**
 * Componente React para gerar tokens e disponibilizá-los em um campo de entrada para o usuário.
 * 
 * @param path - Caminho associado ao campo de valor.
 * @param label - Etiqueta para o campo de entrada.
 * @param required - Flag que indica se o campo é obrigatório ou não.
 * @returns {React.FC<any>} Componente React.
 */
const TokenGenerator: React.FC<any> = ({ path, label, required }) => {
  // Utilizando hooks de campo e autenticação
  const { value, setValue } = useField<any>({ path });
  const authentication = useAuth();

  // Obtendo o nome do campo do path fornecido
  const fieldName = path.split('.').pop();

  /**
   * Função assíncrona para gerar tokens quando acionada.
   * Faz uma chamada API para obter o token e atualiza o valor do campo.
   * 
   * @param {any} e - Evento que dispara a função.
   */
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

  // Renderizando o componente
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
            onClick={(event)=>{
              copyLinkToClipboard(event);
            }}
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
