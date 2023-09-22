import isNewUserForToken from '../../src/access/isNewUserForToken'; // Atualize para o caminho correto

describe('isNewUserForToken', () => {
  // Deve retornar verdadeiro para token válido
  it('should return true for valid token', async () => {
    const mockReq = {
      body: { token: 'validToken' },
      user: undefined,
      payload: {
        find: jest.fn().mockResolvedValue({ docs: [{}] }),
      },
    };

    const result = await isNewUserForToken({ req: mockReq });
    expect(result).toBe(true);
  });

  // Deve retornar falso para um usuário existente tentando com um token válido
  it('should return false for an existing user trying with valid token', async () => {
    const mockReq = {
      body: { token: 'validToken' },
      user: { id: 'someUserId' },
      payload: {
        find: jest.fn().mockResolvedValue({ docs: [{}] }),
      },
    };

    const result = await isNewUserForToken({ req: mockReq });
    expect(result).toBe(false);
  });

  // Deve retornar falso para um token inválido
  it('should return false for an invalid token', async () => {
    const mockReq = {
      body: { token: 'invalidToken' },
      user: undefined,
      payload: {
        find: jest.fn().mockResolvedValue({ docs: [] }),
      },
    };

    const result = await isNewUserForToken({ req: mockReq });
    expect(result).toBe(false);
  });

  // Deve retornar verdadeiro para um usuário administrador
  it('should return true for an admin user', async () => {
    const mockReq = {
      body: {},
      user: { roles: ['admin'] },
      payload: {
        find: jest.fn(),
      },
    };

    const result = await isNewUserForToken({ req: mockReq });
    expect(result).toBe(true);
  });

  // Deve retornar falso para qualquer outro caso
  it('should return false for any other case', async () => {
    const mockReq = {
      body: {},
      user: { roles: ['editor'] },
      payload: {
        find: jest.fn(),
      },
    };

    const result = await isNewUserForToken({ req: mockReq });
    expect(result).toBe(false);
  });
});
