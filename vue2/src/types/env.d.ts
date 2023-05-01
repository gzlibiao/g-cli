/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;// 根路径
  readonly VITE_APP_TITLE: string;// title
  readonly VITE_REFRESH_TOKEN_TIME: number;// refresh token time
  readonly VITE_BASE_SERVER_BASE_URL: string; // api base url
  readonly VITE_BASE_SERVER_TARGET_URL: string; // api target url
  readonly VITE_BASE_DEFAULT_URL: string; // default path
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
