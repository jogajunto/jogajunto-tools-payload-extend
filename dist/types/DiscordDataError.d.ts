import { EmbedData } from './discord/EmbedData';
/**
 * Representa um erro para dados destinados ao Discord.
 */
export interface DiscordDataError {
    error: Error;
    embed?: EmbedData;
}
