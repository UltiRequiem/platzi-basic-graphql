import { MongoClient, Db } from "mongodb";

const mongoUrl = process.env.MONGO_URL,
  DB_NAME = process.env.DB_NAME;

let connection: Db;

export async function connectDB() {
  if (connection) return connection;

  let client;

  try {
    client = await MongoClient.connect(mongoUrl);
    connection = client.db(DB_NAME);
  } catch (error) {
    console.error("Could not connect to db", mongoUrl, error);
    process.exit(1);
  }

  return connection;
}
