import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import MinimalTemplate from 'payload/dist/admin/components/templates/Minimal';
import Button from 'payload/dist/admin/components/elements/Button';
import { AdminView } from 'payload/config';
import { useStepNav } from 'payload/components/hooks';
import { useConfig } from 'payload/dist/admin/components/utilities/Config';
import Meta from 'payload/dist/admin/components/utilities/Meta';

type FeedbackType = 'success' | 'error';

interface Feedback {
  type?: FeedbackType;
  message?: string;
}

const ImportView: AdminView = ({ user, canAccessAdmin }) => {
  const {
    routes: { admin: adminRoute },
  } = useConfig();
  const { setStepNav } = useStepNav();
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    setStepNav([
      {
        label: 'Import JSON View',
      },
    ]);
  }, [setStepNav]);

  const userRoles: any = user.roles;

  if (!user || (user && !canAccessAdmin) || userRoles.includes('editor')) {
    return <Redirect to={`${adminRoute}/unauthorized`} />;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    setFeedback({
      type: 'error',
      message: 'Nenhum arquivo selecionado!',
    });
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const jsonData = JSON.parse(event.target?.result as string);

        const response = await fetch('/import-payload-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });

        const responseData = await response.json();

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
