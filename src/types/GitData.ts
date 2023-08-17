import { ClientPayload } from '.';

/**
 * Define os dados para o hook globalAfterChange, relacionado ao Git.
 */
export interface GitData {
  event_type: string;
  client_payload: ClientPayload;
}
