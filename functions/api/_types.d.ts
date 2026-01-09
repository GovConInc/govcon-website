export interface Env {
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string;
  GOOGLE_SERVICE_ACCOUNT_JSON?: string;
  GOOGLE_PRIVATE_KEY?: string;
  BQ_PROJECT_ID?: string;
  BQ_LOCATION?: string;
  BQ_TABLE_FQN?: string;
  BQ_QUERY_TEMPLATE?: string;
  BQ_SEARCH_FIELDS?: string;
  BQ_LIMIT?: string;

  RSS_URL?: string;

  LEADS?: KVNamespace;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_FORWARD_WEBHOOK?: string;
}
