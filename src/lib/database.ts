import { Collection, MongoClient } from "mongodb";
import { DB_NAME, MONGO_URL } from "../config";

import type { Db } from "mongodb";
import { Course } from "./dto";

class DB {
  #conn?: MongoClient;
  db?: Db;
  coursesCol?: Collection<Course>;

  constructor(public url: string, public dbName: string) {}

  async setup() {
    this.#conn ||= await MongoClient.connect(this.url);
    this.db = this.#conn.db(this.dbName);
    this.coursesCol = this.db.collection("courses");
  }

  async courses() {
    if (!this.coursesCol) {
      await this.setup();
    }

    return this.coursesCol?.find().toArray() as Promise<Course[]>;
  }

  async course(id: string) {
    if (!this.coursesCol) {
      await this.setup();
    }

    return this.coursesCol?.findOne({ _id: id }) as Promise<Course>;
  }
}

export const Database = new DB(MONGO_URL, DB_NAME);
