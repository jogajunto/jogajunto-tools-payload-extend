import { EmailHTMLCTA } from './EmailHTMLCTA';
/**
 * Representa os dados para renderizar um e-mail HTML.
 */
export interface EmailHTMLData {
    headline: string;
    content: string;
    cta: EmailHTMLCTA;
}
