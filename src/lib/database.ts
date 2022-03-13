import { MongoClient, ObjectId } from "mongodb";
import { DB_NAME, MONGO_URL } from "../config";

import type { Collection, Db } from "mongodb";
import type { Course, Student } from "./dto";

export class Repository {
  db: Db;
  coursesCol: Collection<Course>;
  studentsCol: Collection<Student>;

  constructor(private conn: MongoClient, private dbName: string) {
    this.db = this.conn.db(this.dbName);
    this.coursesCol = this.db.collection("courses");
    this.studentsCol = this.db.collection("students");
  }

  // This patron is so lovely on Deno but a Nightmare on Node.js + TypeScript
  static async create(MONGO_URL: string, DB_NAME: string): Promise<Repository> {
    const connection = await MongoClient.connect(MONGO_URL);
    return new Repository(connection, DB_NAME);
  }

  async courses() {
    return this.coursesCol.find().toArray();
  }

  async students() {
    return this.studentsCol.find().toArray();
  }

  async student(id: string) {
    return this.studentsCol.findOne({ _id: new ObjectId(id) });
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

  async editCourse(id: string, input: Partial<Course>) {
    const parsedId = new ObjectId(id);

    await this.coursesCol.updateOne({ _id: parsedId }, { $set: input });

    return this.coursesCol.findOne({ _id: parsedId });
  }

  async editPerson(id: string, input: Partial<Student>) {
    const parsedId = new ObjectId(id);

    await this.studentsCol.updateOne({ _id: parsedId }, { $set: input });

    return this.studentsCol.findOne({ _id: parsedId });
  }

  async addPeople(courseID: string, personID: string) {
    const parsedCourseID = new ObjectId(courseID),
      parsedPersonID = new ObjectId(personID);

    const course = await this.coursesCol.findOne({ _id: parsedCourseID }),
      person = await this.studentsCol.findOne({ _id: parsedPersonID });

    if (!course || !person) {
      throw new Error("course or person not found");
    }

    await this.coursesCol.updateOne(
      { _id: parsedPersonID },
      { $addToSet: { people: parsedPersonID } }
    );

    return course;
  }

  async deleteCourse(id: string) {
    return this.coursesCol.deleteOne({ _id: new ObjectId(id) });
  }

  async deleteStudent(id: string) {
    return this.studentsCol.deleteOne({ _id: new ObjectId(id) });
  }

  async searchItems(keyword: string) {
    const courses = await this.coursesCol
      .find({ $text: { $search: keyword } })
      .toArray();

    const people = await this.studentsCol
      .find({ $text: { $search: keyword } })
      .toArray();

    return [...courses, ...people];
  }

  async people(peopleID: string[]) {
    const ids = peopleID ? peopleID.map((id) => new ObjectId(id)) : [];

    const peopleData =
      ids.length > 0
        ? await this.studentsCol.find({ _id: { $in: ids } }).toArray()
        : [];

    return peopleData;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const Data = await Repository.create(MONGO_URL!, DB_NAME!);
