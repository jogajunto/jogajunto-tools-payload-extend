import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal';
import Button from 'payload/dist/admin/components/elements/Button';
import { AdminView } from 'payload/config';
import { useStepNav } from 'payload/components/hooks';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import Meta from 'payload/dist/admin/components/utilities/Meta';

// Definindo os tipos para feedback.
type FeedbackType = 'success' | 'error';

interface Feedback {
  type?: FeedbackType;
  message?: string;
}

/**
 * View para importar dados em formato JSON para o Payload CMS.
 * 
 * @param user - O usuário logado atualmente.
 * @param canAccessAdmin - Indica se o usuário tem acesso à área de administração.
 */
const ImportView: AdminView = ({ user, canAccessAdmin }) => {
  // Hooks para obter configurações e definir etapas de navegação.
  const {
    routes: { admin: adminRoute },
  } = useConfig();
  const { setStepNav } = useStepNav();

  // Estado local para armazenar o arquivo JSON e feedback para o usuário.
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // Definindo a navegação para esta view.
  useEffect(() => {
    setStepNav([
      {
        label: 'Import JSON View',
      },
    ]);
  }, [setStepNav]);

  // Assegurando que um usuário não logado, não tenha acesso à view.
  const userRoles: any = user.roles;
  if (!user || (user && !canAccessAdmin) || userRoles.includes('editor')) {
    return <Redirect to={`${adminRoute}/unauthorized`} />;
  }

  // Manipulador para capturar a seleção de arquivo.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Manipulador para realizar a importação do JSON.
  const handleImport = async () => {
    // Configuração inicial do feedback.
    setFeedback({
      type: 'error',
      message: 'Nenhum arquivo selecionado!',
    });
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        // Leitura e envio dos dados JSON para o endpoint de importação.
        const jsonData = JSON.parse(event.target?.result as string);
        const response = await fetch('/import-payload-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });

        const responseData = await response.json();

        // Configurando feedback baseado na resposta do servidor.
        if (response.ok) {
          setFeedback({
            type: 'success',
            message:
              responseData.message ||
              'Seus dados foram importados com sucesso!',
          });
        } else {
          setFeedback({
            type: 'error',
            message:
              responseData.message || 'Ocorreu um erro ao importar seus dados.',
          });
        }
      } catch (error: unknown) {
        // Tratando erros ao ler ou processar o arquivo.
        let errorMessage = 'An unknown error occurred.';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setFeedback({
          type: 'error',
          message: `Erro ao processar o arquivo JSON: ${new Error(
            errorMessage
          )}`,
        });
      }
    };
    reader.readAsText(file);
  };

  // Estilização dos componentes da View.
  const ImportViewContainer = styled(MinimalTemplate)`
    h1 {
      margin-bottom: 30px;
    }

    .upload-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;

      label {
        margin-bottom: 10px;
        font-weight: bold;
      }

      input[type='file'] {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .button-section {
      display: flex;
      gap: 10px;
    }
  `;
  const FeedbackMessage = styled.p`
    margin: 20px 0;
    color: #fff;
    padding: 20px;

    &.success {
      background-color: green; // ou a cor que preferir para mensagens de sucesso
    }

    &.error {
      background-color: red;
    }
  `;

  return (
    <ImportViewContainer>
      <Meta
        title='Import JSON'
        description='Import your JSON data into Payload.'
        keywords='Import, JSON, Payload, CMS'
      />
      <h1>Import JSON Route</h1>
      <div className='upload-section'>
        <label>Select your JSON file to import:</label>
        <input type='file' accept='.json' onChange={handleFileChange} />
      </div>
      <div className='button-section'>
        <Button el='button' onClick={handleImport} buttonStyle='secondary'>
          Import
        </Button>
        <Button el='link' to={`${adminRoute}`} buttonStyle='secondary'>
          Cancel
        </Button>
      </div>
      {feedback && (
        <FeedbackMessage className={feedback.type}>
          {feedback.message}
        </FeedbackMessage>
      )}
    </ImportViewContainer>
  );
};

export default ImportView;
