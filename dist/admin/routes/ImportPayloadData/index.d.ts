/**
 * Função para importar dados no formato JSON para o Payload CMS.
 * Processa os dados recebidos, fazendo a necessária transformação/formato
 * e então insere os itens no banco de dados através do Payload CMS.
 *
 * @param req - O objeto de requisição express.
 * @param res - O objeto de resposta express.
 */
declare const ImportPayloadData: (req: any, res: any) => void;
export default ImportPayloadData;
