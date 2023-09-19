import { HookOperationType } from 'payload/dist/collections/config/types';
import { disableUpdateEmail } from '../../src/hooks/disableUpdateEmail';

type CreateOrUpdateOperation = Extract<HookOperationType, 'create' | 'update'>;

describe('disableUpdateEmail', () => {
  // Teste deve gerar um erro se o e-mail for alterado durante uma operação de atualização
  it('should throw an error if email is changed during an update operation', async () => {
    const originalDoc = {
      email: 'original@email.com',
    };
    const data = {
      email: 'new@email.com',
    };

    const params = {
      data,
      req: { payload: {} },
      operation: 'update' as CreateOrUpdateOperation,
      originalDoc,
      context: {},
    };

    // Esperando que o hook lance um erro devido à alteração do e-mail
    await expect(() => disableUpdateEmail(params)).rejects.toThrow(
      'Não é possível alterar seu e-mail.'
    );
  });

  // Teste não deve gerar um erro se o e-mail não for alterado durante uma operação de atualização
  it('should not throw an error if email is not changed during an update operation', async () => {
    const originalDoc = {
      email: 'same@email.com',
    };
    const data = {
      email: 'same@email.com',
    };

    const params = {
      data,
      req: { payload: {} },
      operation: 'update' as CreateOrUpdateOperation,
      originalDoc,
      context: {},
    };

    const result = await disableUpdateEmail(params);
    expect(result).toBe(data); // O e-mail não foi alterado, por isso não deve haver erro
  });

  it('should not throw an error if operation is not an update', async () => {
    const data = {
      email: 'new@email.com',
    };

    const params = {
      data,
      req: { payload: {} },
      operation: 'create' as CreateOrUpdateOperation,
      originalDoc: {},
      context: {},
    };

    const result = await disableUpdateEmail(params);
    expect(result).toBe(data); // A operação não é uma atualização, por isso não deve haver erro
  });
});
