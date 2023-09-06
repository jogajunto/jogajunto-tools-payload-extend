"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payload_1 = __importDefault(require("payload"));
const markdownToContent_1 = require("../../../utilities/markdownToContent");
const FILE_FIELDS = ['image', 'avatar', 'file', 'logo']; // Adicione outros campos conforme necessário
let imageNotFound = false;
const ImportPayloadData = (req, res) => {
    try {
        let rawData = '';
        req.on('data', (chunk) => {
            rawData += chunk;
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(rawData);
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
                            const mediaResponse = await payload_1.default.find({
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
                    if (item.content) {
                        item.content = (0, markdownToContent_1.markdownToContent)(item.content);
                    }
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
                    // Cria o doc
                    await payload_1.default.create({
                        collection: data.collection,
                        data: item,
                    });
                }
                res.status(200).send({ message: 'Dados importados com sucesso.' });
            }
            catch (error) {
                console.error('Erro ao processar e importar dados para o Payload CMS:', error);
                res.status(500).send({ message: 'Erro interno do servidor.' });
            }
        });
    }
    catch (error) {
        console.error('Erro ao importar dados para o Payload CMS:', error);
        res.status(500).send({ message: 'Erro interno do servidor.' });
    }
};
exports.default = ImportPayloadData;
