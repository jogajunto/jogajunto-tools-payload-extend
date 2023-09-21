import Generate from '../../../../../src/admin/routes/JsonWebToken/Generate';
import * as jwt from 'jsonwebtoken';

// Mocking jwt
jest.mock('jsonwebtoken');

describe('Generate function', () => {
    let mockReq: any, mockRes: any;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.resetAllMocks();

        // Mock for req
        mockReq = {
            on: jest.fn((event, callback) => {
                if (event === 'data') callback(JSON.stringify({ user: { roles: ["admin"] } }));
                if (event === 'end') callback();
            })
        };

        // Mock for res
        mockRes = {
            status: jest.fn(() => mockRes),
            send: jest.fn(),
        };

        // Mocking process.env
        process.env.PAYLOAD_SECRET = 'test_secret';
    });

    // Deve gerar um token JWT para o usuário administrador
    it('should generate a JWT token for admin user', () => {
        (jwt.sign as jest.Mock).mockReturnValue('mocked_token');
        
        Generate(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({
            token: 'mocked_token'
        }));
    });

    // Deve retornar 400 se a geração do token falhar, lembrando que para ele chegar na geração do token ele tem que ter um user admin
    it('should return 400 if token generation fails', () => {
        // Mockando jwt.sign para retornar undefined
        (jwt.sign as jest.Mock).mockReturnValue(undefined);

        // Mockar o request com a role 'admin'
        mockReq.on = jest.fn((event, callback) => {
            if (event === 'data') callback(JSON.stringify({ user: { roles: ["admin"] } }));
            if (event === 'end') callback();
        });
        
        Generate(mockReq, mockRes);

        // Verificando se o código de status e a mensagem corretos foram enviados
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith({ message: 'Algo de errado ao gerar o token.' });
    });

    // Verificando a função do usuário e a validade dos dados
    describe('Checking user role and data validity', () => {
        // Dados ausentes
        it('should return 400 if data is missing', () => {
            // Mockar o request sem os dados
            mockReq.on = jest.fn((event, callback) => {
                if (event === 'data') callback(JSON.stringify({})); // dados ausentes
                if (event === 'end') callback();
            });
    
            Generate(mockReq, mockRes);
    
            // Verificar a resposta
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({ message: 'Não encontrado' });
        });
    
        // Role 'admin' ausente
        it('should return 400 if user does not have admin role', () => {
            // Mockar o request sem a role 'admin'
            mockReq.on = jest.fn((event, callback) => {
                if (event === 'data') callback(JSON.stringify({ user: { roles: ["user"] } }));
                if (event === 'end') callback();
            });
    
            Generate(mockReq, mockRes);
    
            // Verificar a resposta
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.send).toHaveBeenCalledWith({ message: 'Não encontrado' });
        });
    
        // Role 'admin' presente (não deve retornar 400)
        it('should not return 400 if user has admin role', () => {
            // Mocka o token para não cair no 400 que retorna na linha 48 de Generate, caso o token não for gerado
            (jwt.sign as jest.Mock).mockReturnValue('mocked_token');

            // Mockar o request com a role 'admin'
            mockReq.on = jest.fn((event, callback) => {
                if (event === 'data') callback(JSON.stringify({ user: { roles: ["admin"] } }));
                if (event === 'end') callback();
            });
    
            Generate(mockReq, mockRes);
    
            // Verificar que a resposta não é 400
            expect(mockRes.status).not.toHaveBeenCalledWith(400);
            expect(mockRes.send).not.toHaveBeenCalledWith({ message: 'Não encontrado' });
        });
    
    });

    // Testes de exceções
    describe('Exceptions tests', () => {
        // Deve lidar com erros genéricos
        it('should handle generic Error', () => {
            const mockError = new Error('Generic error message');
            (jwt.sign as jest.Mock).mockImplementation(() => { throw mockError });
            
            Generate(mockReq, mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.send).toHaveBeenCalledWith({ message: 'Generic error message' });
        });
    
        // Deve lidar com erros desconhecidos
        it('should handle unknown errors', () => {
            (jwt.sign as jest.Mock).mockImplementation(() => { throw {} }); // lançando um objeto vazio
            
            Generate(mockReq, mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.send).toHaveBeenCalledWith({ message: 'An unknown error occurred.' });
        });
        
        //Deve tratar o erro interno do servidor durante o evento de dados
        it('should handle server internal error during data event', () => {
            // Resetando os mocks
            jest.resetAllMocks();
    
            // Mockando req para lançar um erro no evento 'data'
            mockReq = {
                on: jest.fn((event, callback) => {
                    if (event === 'data') {
                        throw new Error('Erro interno do servidor.'); // Simula o erro
                    }
                })
            };
    
            // Mockando res
            mockRes = {
                status: jest.fn(() => mockRes),
                send: jest.fn(),
            };
    
            Generate(mockReq, mockRes);
    
            // Verifica se o erro interno do servidor foi enviado corretamente
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.send).toHaveBeenCalledWith({ message: 'Erro interno do servidor.' });
        });
    });
});

