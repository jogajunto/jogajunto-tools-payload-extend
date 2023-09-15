import * as jwt from 'jsonwebtoken';
import payload from 'payload';

/**
 * Função para validar um token JSON Web.
 * Esta função verifica se um token específico é válido e ainda não foi usado.
 * 
 * @param req - Requisição recebida.
 * @param res - Resposta a ser enviada.
 */
const Validate = (req: any, res: any) => {
  try {
    let rawData = '';

    // Coleta os dados do body da requisição.
    req.on('data', (chunk: string) => {
      rawData += chunk;
    });

    req.on('end', async () => {
      try {
        // Extração do token do rawData.
        const token = JSON.parse(rawData).token;

        // Busca pelo token no sistema para verificar se ele é válido e ainda não foi usado.
        const response = await payload.find({
          collection: 'tokennewusers',
          where: {
            token: { equals: token },
            used: { equals: false || undefined },
          },
        });

        // Se não houver docs na resposta, significa que o token é inválido.
        if (response.docs.length <= 0) {
          return res.status(400).send({ message: 'Token inválido' });
        }

        // Pega o token encontrado na resposta.
        const findToken = response.docs[0].token;

        // Define a chave secreta para a validação do token.
        const secret = process.env.PAYLOAD_SECRET ?? 'secret_key';

        // Verifica o token com a chave secreta.
        jwt.verify(findToken, secret);

        // Token é válido.
        return res
          .status(200)
          .json({ message: 'Token verificado com sucesso.' });
      } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred.';

        // Determina o tipo de erro que ocorreu durante a validação do token.
        if (
          error instanceof Error ||
          error instanceof jwt.TokenExpiredError ||
          error instanceof jwt.NotBeforeError ||
          error instanceof jwt.JsonWebTokenError
        ) {
          errorMessage = error.message;
        }

        // Retorna uma mensagem de erro.
        return res.status(500).send({ message: errorMessage });
      }
    });
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
};

export default Validate;
