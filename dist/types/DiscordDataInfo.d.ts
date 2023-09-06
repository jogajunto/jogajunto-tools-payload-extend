import { EmbedData } from './discord/EmbedData';
/**
 * Representa uma mensagem informativa para dados destinados ao Discord.
 */
export interface DiscordDataInfo {
    message: string;
    embed?: EmbedData;
}
