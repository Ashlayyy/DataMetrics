/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_CLIENT_ID: string;
  // Add other VITE_ prefixed env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
