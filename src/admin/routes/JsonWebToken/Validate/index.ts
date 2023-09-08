import * as jwt from 'jsonwebtoken';
import payload from 'payload';

const Validate = (req: any, res: any) => {
  try {
    let rawData = '';
    req.on('data', (chunk: string) => {
      rawData += chunk;
    });

    req.on('end', async () => {
      try {
        const token = JSON.parse(rawData).token;

        const response = await payload.find({
          collection: 'tokennewusers',
          where: {
            token: { equals: token },
            used: { equals: false || undefined },
          },
        });

        if (response.docs.length <= 0) {
          return res.status(400).send({ message: 'Token inválido' });
        }

        const findToken = response.docs[0].token;
        const secret = process.env.PAYLOAD_SECRET ?? 'secret_key';

        jwt.verify(findToken, secret);

        /** Valid token */
        return res
          .status(200)
          .json({ message: 'Token verificado com sucesso.' });
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
    console.error('Erro ao validar token:', error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
};

export default Validate;
