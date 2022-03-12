import { MongoClient, ObjectId } from "mongodb";
import { DB_NAME, MONGO_URL } from "../config";

import type { Collection, Db } from "mongodb";
import type { Course, Student } from "./dto";

export class DB {
  db: Db;
  coursesCol: Collection<Course>;
  studentsCol: Collection<Student>;

  constructor(private conn: MongoClient, private dbName: string) {
    this.db = this.conn.db(this.dbName);
    this.coursesCol = this.db.collection("courses");
    this.studentsCol = this.db.collection("students");
  }

  static async create(MONGO_URL: string, DB_NAME: string): Promise<DB> {
    const connection = await MongoClient.connect(MONGO_URL);
    return new DB(connection, DB_NAME);
  }

  async courses() {
    return this.coursesCol.find().toArray();
  }

  async course(id: string) {
    return this.coursesCol.findOne({ _id: new ObjectId(id) });
  }

  async addCourse(course: Course) {
    const newCourse = await this.coursesCol.insertOne(course);

    if (!newCourse) {
      throw new Error("Failed to add course");
    }

    return { ...course, _id: newCourse.insertedId };
  }

  async createPerson(studentData: Student) {
    const student = await this.studentsCol.insertOne(studentData);

    return { ...studentData, _id: student.insertedId };
  }
}
export const Database = await DB.create(MONGO_URL, DB_NAME);
