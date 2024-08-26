declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_URL: string;
    NODE_ENV: string;
    PORT: number;
    KIS_KEY: string;
    KIS_SECRET: string;
  }
}
