import getPort from "get-port";

export const PORT = process.env.PORT ?? 3000 ?? (await getPort());

export const { MONGO_URL, DB_NAME } = process.env;

export const PRODUCTION = process.env.NODE_ENV === "production";
