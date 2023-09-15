import payload from 'payload';

/**
 * Função para definir um token específico como usado.
 * Após um token ser usado, ele não pode ser reutilizado.
 * 
 * @param req - Requisição recebida.
 * @param res - Resposta a ser enviada.
 */
const SetUsed = (req: any, res: any) => {
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

        // Atualiza o token para marcá-lo como usado no sistema.
        const response = await payload.update({
          collection: 'tokennewusers',
          where: {
            token: { equals: token },
          },
          data: {
            used: true,
          },
        });

        // Se não houver docs na resposta, significa que o token não foi validado.
        if (response.docs.length <= 0) {
          return res
            .status(400)
            .send({ message: 'Algo de errado ao validar o token.' });
        }

        // Token validado com sucesso.
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
