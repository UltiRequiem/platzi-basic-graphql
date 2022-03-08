import { MongoClient, Db } from "mongodb";

const mongoUrl = `mongodb://127.0.0.1:27017/`,
  DB_NAME = "test";

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
