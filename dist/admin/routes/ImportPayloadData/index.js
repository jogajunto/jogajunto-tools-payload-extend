"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payload_1 = __importDefault(require("payload"));
const markdownToContent_1 = require("../../../utilities/markdownToContent");
/**
 * Constante de campos de arquivo que precisam ser tratados de forma especial durante a importação.
 * Novos campos podem ser adicionados conforme necessário.
 */
const FILE_FIELDS = ['image', 'avatar', 'file', 'logo']; // Adicione outros campos conforme necessário
// Flag para verificar se a imagem não foi encontrada durante o processo
let imageNotFound = false;
/**
 * Função para importar dados no formato JSON para o Payload CMS.
 * Processa os dados recebidos, fazendo a necessária transformação/formato
 * e então insere os itens no banco de dados através do Payload CMS.
 *
 * @param req - O objeto de requisição express.
 * @param res - O objeto de resposta express.
 */
const ImportPayloadData = (req, res) => {
    try {
        let rawData = '';
        // Concatenando chunks de dados recebidos na requisição
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        // Processando os dados após a requisição estar completa
        req.on('end', async () => {
            try {
                const data = JSON.parse(rawData);
                // Validações iniciais dos dados recebidos
                if (!data) {
                    return res.status(400).send({ message: 'Dados inválidos.' });
                }
                if (!data.collection || !Array.isArray(data.items)) {
                    return res
                        .status(400)
                        .send({ message: 'Estrutura do JSON inválida.' });
                }
                // Iterando através de cada item e processando campos de arquivo
                for (const item of data.items) {
                    for (const field of FILE_FIELDS) {
                        if (item.hasOwnProperty(field) && typeof item[field] === 'string') {
                            const filename = item[field];
                            // Buscando o arquivo de mídia correspondente no Payload
                            const mediaResponse = await payload_1.default.find({
                                collection: 'media',
                                where: {
                                    filename: { equals: filename },
                                },
                                depth: 1,
                                limit: 1,
                            });
                            const mediaDocs = mediaResponse.docs;
                            if (mediaDocs && mediaDocs.length > 0) {
                                item[field] = mediaDocs[0].id;
                                imageNotFound = false;
                            }
                            else {
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
                    // Transformando conteúdo markdown, se existente
                    if (item.content) {
                        item.content = (0, markdownToContent_1.markdownToContent)(item.content);
                    }
                    // Associando categoria, se existente
                    if (item.category) {
                        let category = await payload_1.default.find({
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
                    // Inserindo o item no Payload
                    await payload_1.default.create({
                        collection: data.collection,
                        data: item,
                    });
                }
                // Enviando resposta de sucesso
                return res
                    .status(200)
                    .send({ message: 'Dados importados com sucesso.' });
            }
            catch (error) {
                console.error('Erro ao processar e importar dados para o Payload CMS:', error);
                return res.status(500).send({ message: 'Erro interno do servidor.' });
            }
        });
    }
    catch (error) {
        console.error('Erro ao importar dados para o Payload CMS:', error);
        res.status(500).send({ message: 'Erro interno do servidor.' });
    }
};
exports.default = ImportPayloadData;
