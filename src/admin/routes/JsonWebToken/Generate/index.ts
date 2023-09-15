import * as jwt from 'jsonwebtoken';

/**
 * Interface para representar a estrutura dos dados recebidos na requisição.
 */
interface PayloadData {
  user: any;
}

/**
 * Função para gerar um JSON Web Token (JWT) com base nos dados recebidos.
 * O JWT gerado é do tipo 'user-invite' e tem uma validade de 1 hora.
 * 
 * @param req - Requisição recebida.
 * @param res - Resposta a ser enviada.
 */
const Generate = (req: any, res: any) => {
  try {
    let rawData = '';

    // Coletando dados do body da requisição
    req.on('data', (chunk: string) => {
      rawData += chunk;
    });

    req.on('end', async () => {
      try {
        const data: PayloadData = JSON.parse(rawData);

        // Verificando a validade dos dados e se o usuário tem a role 'admin'
        if (!data || !data.user.roles.includes('admin')) {
          return res.status(400).send({ message: 'Não encontrado' });
        }

        const secret = process.env.PAYLOAD_SECRET ?? 'secret_key';

        /**
         * Função interna para gerar o JWT.
         */
        const generateToken = () => {
          return jwt.sign({ type: 'user-invite' }, secret, { expiresIn: '1h' });
        };

        const token = generateToken();

        // Verificar se o token foi gerado corretamente
        if (!token)
          return res
            .status(400)
            .send({ message: 'Algo de errado ao gerar o token.' });

        // Retornar o token gerado
        return res
          .status(200)
          .send({ token: token, message: 'Token gerado com sucesso.' });
      } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred.';

        // Lidando com possíveis erros durante a geração do JWT
        if (
          error instanceof Error ||
          error instanceof jwt.TokenExpiredError ||
          error instanceof jwt.NotBeforeError ||
          error instanceof jwt.JsonWebTokenError
        ) {
          errorMessage = error.message;
        }
        return res.status(500).send({ message: errorMessage });
      }
    });
  } catch (error) {
    console.error('Erro ao gerar token:', error);
    res.status(500).send({ message: 'Erro interno do servidor.' });
  }
};

/**
 * Exportando a função Generate para ser utilizada em outras partes do código.
 */
export default Generate;
