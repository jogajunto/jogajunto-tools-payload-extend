import * as jwt from 'jsonwebtoken';

interface PayloadData {
  user: any;
}

const Generate = (req: any, res: any) => {
  try {
    let rawData = '';
    req.on('data', (chunk: string) => {
      rawData += chunk;
    });

    req.on('end', async () => {
      try {
        const data: PayloadData = JSON.parse(rawData);

        if (!data || !data.user.roles.includes('admin')) {
          return res.status(400).send({ message: 'Não encontrado' });
        }

        const secret = process.env.PAYLOAD_SECRET ?? 'secret_key';
        const generateToken = () => {
          return jwt.sign({ type: 'user-invite' }, secret, { expiresIn: '1h' });
        };

        const token = generateToken();

        if (!token)
          return res
            .status(400)
            .send({ message: 'Algo de errado ao gerar o token.' });

        /** Return token */
        return res
          .status(200)
          .send({ token: token, message: 'Token gerado com sucesso.' });
      } catch (error: unknown) {
        let errorMessage = 'An unknown error occurred.';
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

export default Generate;
