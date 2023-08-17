import { ClientPayload } from '.';

// Definição dos tipos para os dados no hook globalAfterChange
export interface GitData {
  event_type: string;
  client_payload: ClientPayload;
}
