import payload from 'payload';
import { markdownToContent } from '../../../utilities/markdownToContent';

interface Item {
  [key: string]: any;
}

interface PayloadData {
  collection: string;
  items: Item[];
}

const FILE_FIELDS = ['image', 'avatar', 'file', 'logo']; // Adicione outros campos conforme necessário

let imageNotFound = false;

const ImportPayloadData = (req: any, res: any) => {
  try {
    let rawData = '';
    req.on('data', (chunk: string) => {
      rawData += chunk;
    });

    req.on('end', async () => {
      try {
        const data: PayloadData = JSON.parse(rawData);

        if (!data) {
          return res.status(400).send({ message: 'Dados inválidos.' });
        }

        if (!data.collection || !Array.isArray(data.items)) {
          return res
            .status(400)
            .send({ message: 'Estrutura do JSON inválida.' });
        }

        for (const item of data.items) {
          for (const field of FILE_FIELDS) {
            if (item.hasOwnProperty(field) && typeof item[field] === 'string') {
              const filename = item[field];

              const mediaResponse = await payload.find({
                collection: 'media',
                where: {
                  filename: { equals: filename },
                },
                depth: 1,
                limit: 1,
              });

              // Supondo que o retorno tenha uma propriedade 'docs'
              const mediaDocs = mediaResponse.docs;

              if (mediaDocs && mediaDocs.length > 0) {
                item[field] = mediaDocs[0].id;
                imageNotFound = false;
              } else {
                // console.error(`Media item with filename ${filename} not found`);
                imageNotFound = true;
                continue;
              }
            }
          }

          // Não cria os docs se não encontrar imagem em posts que precisam de imagem
          if (imageNotFound) {
            continue;
          }

          if (item.content) {
            item.content = markdownToContent(item.content);
          }

          if (item.category) {
            let category = await payload.find({
              collection: 'categories',
              where: {
                name: item.category,
              },
              depth: 2,
            });

            if (category) {
              item.category = category.docs[0].id;
            }
          }

          // Cria o doc
          await payload.create({
            collection: data.collection as any,
            data: item,
          });
        }

        res.status(200).send({ message: 'Dados importados com sucesso.' });
      } catch (error) {
        console.error(
          'Erro ao processar e importar dados para o Payload CMS:',
          error
        );
        res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    });
  } catch (error) {
    console.error('Erro ao importar dados para o Payload CMS:', error);
    res.status(500).send({ message: 'Erro interno do servidor.' });
  }
};

export default ImportPayloadData;
