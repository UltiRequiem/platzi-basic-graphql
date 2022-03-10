declare namespace NodeJS {
  interface ProcessEnv {
    readonly MONGO_URL: string;
    readonly DB_NAME: string;
    readonly NODE_ENV: string;
    readonly PORT?: string;
  }
}
