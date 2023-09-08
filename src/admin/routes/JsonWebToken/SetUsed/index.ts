import payload from 'payload';

const SetUsed = (req: any, res: any) => {
  try {
    let rawData = '';
    req.on('data', (chunk: string) => {
      rawData += chunk;
    });

    req.on('end', async () => {
      try {
        const token = JSON.parse(rawData).token;

        const response = await payload.update({
          collection: 'tokennewusers',
          where: {
            token: { equals: token },
          },
          data: {
            used: true,
          },
        });

        if (response.docs.length <= 0) {
          return res
            .status(400)
            .send({ message: 'Algo de errado ao validar o token.' });
        }

        /** Valid token */
        return res
          .status(200)
          .json({ message: 'Token verificado com sucesso.' });
      } catch (error) {
        console.error('Erro na requisição:', error);
        res.status(500).send({ message: 'Erro interno do servidor.' });
      }
    });
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return res.status(500).send({ message: 'Erro interno do servidor.' });
  }
};

export default SetUsed;
