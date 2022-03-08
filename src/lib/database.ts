import { exit } from "node:process";
import { Db, MongoClient } from "mongodb";
import { DB_NAME, MONGO_URL } from "../config";

let connection: Db;

export async function connectDB() {
  if (connection) return connection;

  let client;

  try {
    client = await MongoClient.connect(MONGO_URL);
    connection = client.db(DB_NAME);
  } catch (error) {
    console.error("Could not connect to db", MONGO_URL, error);
    exit(1);
  }

  return connection;
}
