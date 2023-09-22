import { beforeDeleteAndQueue } from '../../src/hooks/beforeDeleteAndQueue';
import payload from 'payload';
import { addToQueue } from '../../src/queue/queueManagerMemory';

// Mockando as funções
jest.mock('payload', () => ({
  findByID: jest.fn(),
}));

jest.mock('../../src/queue/queueManagerMemory', () => ({
  addToQueue: jest.fn(),
}));

describe('beforeDeleteAndQueue', () => {
  const mockCollectionName = 'testCollection';
  const mockDirectoryRepository = '/test/directory';
  const mockCollectionFormatters = {};
  const mockId = '12345';
  const mockDocument = { id: mockId, name: 'Test Document' };

  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  // Deve buscar o documento por ID e adicioná-lo à fila
  it('should fetch the document by ID and add it to the queue', async () => {
    // Setup para que payload.findByID retorne um documento mockado
    (payload.findByID as jest.Mock).mockResolvedValue(mockDocument);

    // Criando o hook e executando-o
    const hook = beforeDeleteAndQueue(
      mockCollectionName,
      mockDirectoryRepository,
      mockCollectionFormatters
    );
    await hook({ req: {}, id: mockId, context: {} });

    // Verificar se payload.findByID foi chamado corretamente
    expect(payload.findByID).toHaveBeenCalledWith({
      collection: mockCollectionName,
      id: mockId,
    });

    // Verificar se addToQueue foi chamado corretamente
    expect(addToQueue).toHaveBeenCalledWith(
      mockCollectionName,
      mockId,
      mockDocument,
      'delete',
      mockDirectoryRepository,
      mockCollectionFormatters
    );
  });

  // Não deve chamar o addToQueue caso aconteça um throw em payload.findByID
  it('should throw an error when payload.findByID throws an error', async () => {
    // Mockando payload.findByID para lançar um erro
    (payload.findByID as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    // Definindo o hook
    const hook = beforeDeleteAndQueue(
      mockCollectionName,
      mockDirectoryRepository,
      mockCollectionFormatters
    );

    // Esperando que o hook lance um erro quando for chamado
    await expect(hook({ req: {}, id: mockId, context: {} })).rejects.toThrow(
      'Test error'
    );

    // Verificando que addToQueue não foi chamado, já que o processo foi interrompido pelo erro
    expect(addToQueue).not.toHaveBeenCalled();
  });
});
