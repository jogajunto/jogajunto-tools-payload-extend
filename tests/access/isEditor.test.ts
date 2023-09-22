import { isEditorOrOwnsDocument, isEditor } from '../../src/access/isEditor';

describe('isEditorOrOwnsDocument', () => {
  // Deve retornar verdadeiro se o usuário tiver função de administrador
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

  // Deve retornar o objeto de condição se o usuário tiver a função de editor e o documento de usuário acessado for dele
  it('should return the condition object if the user has the editor role and the accessed user document is theirs', () => {
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

  // Deve retornar falso se o usuário não tiver função de editor ou administrador
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
  // Deve retornar verdadeiro se o usuário tiver função de editor
  it('should return true if user has editor role', () => {
    const mockReq = {
      user: {
        roles: ['editor'],
      },
    };

    const result = isEditor({ req: mockReq });
    expect(result).toBe(true);
  });

  // Deve retornar falso se o usuário não tiver função de editor
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
