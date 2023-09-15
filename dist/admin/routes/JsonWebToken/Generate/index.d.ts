/**
 * Função para gerar um JSON Web Token (JWT) com base nos dados recebidos.
 * O JWT gerado é do tipo 'user-invite' e tem uma validade de 1 hora.
 *
 * @param req - Requisição recebida.
 * @param res - Resposta a ser enviada.
 */
declare const Generate: (req: any, res: any) => void;
/**
 * Exportando a função Generate para ser utilizada em outras partes do código.
 */
export default Generate;
