import { DiscordDataError, DiscordDataInfo } from '../../../types/discord';
declare const sendErrorDisc: (data: DiscordDataError) => Promise<void>;
declare const sendInfoDisc: (data: DiscordDataInfo) => Promise<void>;
export { sendErrorDisc, sendInfoDisc };
