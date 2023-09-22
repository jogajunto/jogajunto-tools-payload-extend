import { isAdmin, isAdminFieldLevel } from '../../src/access/isAdmin';

// Acesso a coleção
describe('isAdmin', () => {
  // Deve retornar verdadeiro se o usuário tiver função de administrador
  it('should return true if user has admin role', () => {
    const mockReq = {
      user: {
        name: 'Teste',
        email: 'test@test.com',
        roles: ['admin'],
      },
    };

    const result = isAdmin({ req: mockReq });
    expect(result).toBe(true);
  });

  // Deve retornar falso se o usuário não tiver função de administrador
  it('should return false if user does not have admin role', () => {
    const mockReq = {
      user: {
        name: 'Teste',
        email: 'test@test.com',
        roles: ['editor'],
      },
    };

    const result = isAdmin({ req: mockReq });
    expect(result).toBe(false);
  });
});

// Acesso a fields
describe('isAdminFieldLevel', () => {
  // Deve retornar verdadeiro se o usuário tiver função de administrador
  it('should return true if user has admin role', () => {
    const mockReq = {
      user: {
        name: 'Teste',
        email: 'test@test.com',
        roles: ['admin'],
      },
    };

    const result = isAdminFieldLevel({ req: mockReq });
    expect(result).toBe(true);
  });

  // Deve retornar falso se o usuário não tiver função de administrador
  it('should return false if user does not have admin role', () => {
    const mockReq = {
      user: {
        name: 'Teste',
        email: 'test@test.com',
        roles: ['editor'],
      },
    };

    const result = isAdminFieldLevel({ req: mockReq });
    expect(result).toBe(false);
  });
});
