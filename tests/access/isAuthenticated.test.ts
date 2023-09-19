import { isAuthenticated } from '../../src/access/isAuthenticated';

describe('isAuthenticated', () => {
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
