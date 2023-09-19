import isNewUserForToken from '../../src/access/isNewUserForToken'; // Atualize para o caminho correto

describe('isNewUserForToken', () => {
  // Ao criar um novo usuário para um token válido
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

  // Quando um usuário existente tenta usar um token válido
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

  // Quando um token inválido é usado
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

  // Quando um usuário com papel de admin está criando
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

  // Para qualquer outro caso
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
