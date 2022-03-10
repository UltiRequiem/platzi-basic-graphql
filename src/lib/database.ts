import { MongoClient, ObjectId } from "mongodb";
import { DB_NAME, MONGO_URL } from "../config";

import type { Collection, Db } from "mongodb";
import type { Course } from "./dto";

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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.coursesCol!.find().toArray()!;
  }

  async course(id: string) {
    if (!this.coursesCol) {
      await this.setup();
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.coursesCol!.findOne({ _id: new ObjectId(id) });
  }

  async addCourse(course: Course) {
    if (!this.coursesCol) {
      await this.setup();
    }

    const newCourse = await this.coursesCol?.insertOne(course);

    if (!newCourse) {
      throw new Error("Failed to add course");
    }

    return { ...course, _id: newCourse.insertedId };
  }
}

export const Database = new DB(MONGO_URL, DB_NAME);
