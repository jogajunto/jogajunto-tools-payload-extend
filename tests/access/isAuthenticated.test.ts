import { isAuthenticated } from '../../src/access/isAuthenticated';

describe('isAuthenticated', () => {
  // Deve retornar verdadeiro se o usuário estiver autenticado
  it('should return true if the user is authenticated', () => {
    const mockReq = {
      user: {
        name: 'Teste',
        email: 'test@test.com',
        roles: ['admin'],
      },
      others: {
        one: '',
        two: '',
      },
    };

    const result = isAuthenticated({ req: mockReq });
    expect(result).toBe(true);
  });

  // Deve retornar falso se o usuário não estiver autenticado
  it('should return false if the user is not authenticated', () => {
    const mockReq = {
      others: {
        one: '',
        two: '',
      },
    };

    const result = isAuthenticated({ req: mockReq });
    expect(result).toBe(false);
  });
});
