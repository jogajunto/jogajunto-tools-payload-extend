import { EmbedData } from '../../../types';
declare const sendAxios: (message: string, beforeMessage?: string, embed?: EmbedData) => Promise<void>;
export default sendAxios;
