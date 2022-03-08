declare namespace NodeJS {
  interface ProcessEnv {
    readonly MONGO_URL: string;
    readonly DB_NAME: string;
    readonly PORT?: string;
  }
}
