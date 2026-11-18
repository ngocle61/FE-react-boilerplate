interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_API_URL: string;
  readonly VITE_SHOW_DEMO_ACCOUNTS: string;
  readonly VITE_WEB_VITALS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
