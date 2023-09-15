/**
 * @module sendAction
 * @description Este módulo fornece uma função que permite enviar uma ação para o GitHub.
 *
 * Principais características e funcionalidades:
 *
 * - Envia solicitações ao GitHub usando dados formatados específicos.
 * - Se estiver no ambiente de desenvolvimento, a função apenas loga os dados sem enviar a real solicitação ao GitHub.
 * - Em caso de sucesso ao enviar a solicitação para o GitHub, uma notificação é enviada para o Discord.
 * - Utiliza variáveis de ambiente para obter o token do GitHub e a URL de dispatch do repositório.
 * - Faz uma checagem de segurança para garantir que as variáveis de ambiente necessárias estão definidas antes de tentar enviar a solicitação.
 * - Se ocorrer um erro durante o processo, ele é capturado e uma notificação de erro é enviada ao Discord.
 *
 * Este módulo é fundamental para garantir que as operações executadas no Payload CMS sejam devidamente comunicadas ao GitHub e,
 * consequentemente, para notificar a equipe via Discord sobre os resultados dessas operações.
 */
import { GitData } from '../../../types';
/**
 * Envia uma ação para o GitHub.
 *
 * Esta função permite enviar uma ação para o GitHub. Se o ambiente for
 * de desenvolvimento, ele apenas exibe os dados no console, mas não envia
 * nada. Se for bem-sucedido ao enviar a ação, ele também notifica o Discord.
 *
 * @async
 * @function
 * @param {GitData} dataToSend - Os dados a serem enviados ao GitHub.
 * @throws {Error} Se as variáveis de ambiente GITHUB_TOKEN ou REPOSITORY_DISPATCH_URL não estiverem definidas.
 */
declare const sendAction: (dataToSend: GitData) => Promise<void>;
export default sendAction;
