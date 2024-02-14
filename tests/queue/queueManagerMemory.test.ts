import * as queueManagerMemory from '../../src/queue/queueManagerMemory';
import * as sendActionModule from '../../src/utilities/actions/github/sendAction';
import * as formatMarkdownModule from '../../src/utilities/formatMarkdown';
import * as payload from 'payload';

jest.mock('../../src/utilities/actions/github/sendAction', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('send for github'),
}));
jest.mock('../../src/utilities/formatMarkdown', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue('mocked markdown'),
}));
jest.mock('payload');

describe('queueManagerMemory module', () => {
  // Zera a fila antes de cada teste para garantir um estado limpo.
  beforeEach(() => {
    // Esta é uma solução temporária. Idealmente, você teria uma função `resetQueue` exportada
    // do seu módulo `queueManagerMemory` que permitiria que você limpasse a fila.
    // Isso é mais limpo e menos propenso a erros.
    (queueManagerMemory as any).queue = [];
  });

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.log as jest.Mock).mockRestore();
    (console.error as jest.Mock).mockRestore();
  });

  describe('addToQueue function', () => {
    it('should add an item to the queue and process it if queue was previously empty', async () => {
      // Valores mockados
      const collectionName = 'mockCollection';
      const id = '123456789';
      const document = { slug: 'mock-slug', content: 'mock-content' };
      const directoryRepository = 'mockRepo';
      const collectionFormatters = {}; // Seu mock aqui

      // Act: Adiciona o item à fila
      await queueManagerMemory.addToQueue(
        collectionName,
        id,
        document,
        'delete',
        directoryRepository,
        collectionFormatters
      );

      // Verifica se o item foi adicionado à fila
      const currentQueue = queueManagerMemory.getQueue();
      expect(currentQueue).toHaveLength(1);

      // Verifica se todos os campos do item na fila estão corretos
      const addedItem = currentQueue[0];
      expect(addedItem.collection).toBe(collectionName);
      expect(addedItem.id).toBe(id);
      expect(addedItem.document).toEqual(document);
      expect(addedItem.operation).toBe('delete');
      expect(addedItem.directoryRepository).toBe(directoryRepository);
      expect(addedItem.collectionFormatters).toEqual(collectionFormatters);
    });
  });
});
