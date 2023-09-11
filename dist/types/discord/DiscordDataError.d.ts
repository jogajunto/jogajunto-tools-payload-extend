import { EmbedData } from './EmbedData';
/**
 * Representa um erro para dados destinados ao Discord.
 */
export interface DiscordDataError {
    error: Error;
    embed?: EmbedData;
}
