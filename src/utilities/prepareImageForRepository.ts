import { GitData, ImageType } from '../types';

const prepareImageForRepository = async (
  data: GitData,
  directoryImage: string,
  image: ImageType
) => {
  try {
    // Adiciona a imagem à payload do cliente
    data.client_payload.image = image.url;
    const url = image.url;
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const filenameParts = filename.split('.');
    const extension = filenameParts.pop(); // Remove a extensão

    if (extension) {
      data.client_payload.image_extension = extension;
    }

    const nameWithoutExtension = filenameParts.join('.'); // Junta o resto sem a extensão

    if (nameWithoutExtension) {
      data.client_payload.image_filename = nameWithoutExtension;
    }

    data.client_payload.directory_image = directoryImage;
    return data;
  } catch (error) {
    /* Tratamento de erro em prepareImageForRepository */
    console.error(
      'Erro ao preparar a imagem para o repositório:',
      error.message
    );
    throw error;
  }
};

export default prepareImageForRepository;