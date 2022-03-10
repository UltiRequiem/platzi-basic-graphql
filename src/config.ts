export const PORT = process.env.PORT ?? 3456;
export const { MONGO_URL, DB_NAME } = process.env;
export const PRODUCTION = process.env.NODE_ENV === 'production';
