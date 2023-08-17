/**
 * Representa a carga (payload) do cliente.
 */
export interface ClientPayload {
  /**
   * Um identificador único.
   */
  slug: string;

  /**
   * A operação a ser realizada.
   */
  operation: string;

  /**
   * O diretório-alvo.
   */
  directory: string;

  /**
   * O conteúdo principal.
   */
  content: string;

  /**
   * O diretório da imagem, se existir.
   */
  directory_image?: string;

  /**
   * A URL da imagem.
   */
  image?: string;

  /**
   * A extensão da imagem.
   */
  image_extension?: string;

  /**
   * O nome do arquivo da imagem.
   */
  image_filename?: string;
}
