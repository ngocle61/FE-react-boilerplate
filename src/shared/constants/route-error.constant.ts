export const ROUTE_ERROR_KINDS = {
  NOT_FOUND: 'not-found',
  CHUNK_LOAD: 'chunk-load',
  UNKNOWN: 'unknown',
} as const;

export const CHUNK_LOAD_ERROR_PATTERN =
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i;
