import { isAdmin, isAdminFieldLevel } from '../../dist/access/isAdmin';

describe('isAdmin', () => {
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

describe('isAdminFieldLevel', () => {
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
