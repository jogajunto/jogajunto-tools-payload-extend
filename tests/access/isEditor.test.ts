import { isEditorOrOwnsDocument, isEditor } from '../../dist/access/isEditor';

describe('isEditorOrOwnsDocument', () => {
  // Teste para verificar se um usuário admin tem permissão total
  it('should return true if user has admin role', () => {
    const mockReq = {
      user: {
        id: '12345',
        roles: ['admin'],
      },
    };

    const result = isEditorOrOwnsDocument({ req: mockReq });
    expect(result).toBe(true);
  });

  // Teste para verificar se um usuário editor tem acesso ao próprio documento
  it('should return condition object if user has editor role', () => {
    const mockReq = {
      user: {
        id: '12345',
        roles: ['editor'],
      },
    };

    const result = isEditorOrOwnsDocument({ req: mockReq });
    expect(result).toEqual({
      id: {
        equals: '12345',
      },
    });
  });

  // Teste para verificar se um usuário sem o papel de editor ou admin é negado
  it('should return false if user does not have editor or admin role', () => {
    const mockReq = {
      user: {
        id: '12345',
        roles: ['user'],
      },
    };

    const result = isEditorOrOwnsDocument({ req: mockReq });
    expect(result).toBe(false);
  });
});

describe('isEditor', () => {
  // Teste para verificar se um usuário editor retorna verdadeiro
  it('should return true if user has editor role', () => {
    const mockReq = {
      user: {
        roles: ['editor'],
      },
    };

    const result = isEditor({ req: mockReq });
    expect(result).toBe(true);
  });

  // Teste para verificar se um usuário que não é editor retorna falso
  it('should return false if user does not have editor role', () => {
    const mockReq = {
      user: {
        roles: ['user'],
      },
    };

    const result = isEditor({ req: mockReq });
    expect(result).toBe(false);
  });
});
