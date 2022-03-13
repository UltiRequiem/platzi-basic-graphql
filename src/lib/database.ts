import { MongoClient, ObjectId } from "mongodb";
import { DB_NAME, MONGO_URL } from "../config";

import type { Collection, Db } from "mongodb";
import type { Course, Student } from "./dto";

class Repository {
  private readonly db: Db;
  private readonly coursesCol: Collection<Course>;
  private readonly studentsCol: Collection<Student>;

  private static _instance: Repository;

  private constructor(private conn: MongoClient, private dbName: string) {
    this.db = this.conn.db(this.dbName);

    this.coursesCol = this.db.collection("courses");
    this.studentsCol = this.db.collection("students");
  }

  public static async Instance(
    MONGO_URL?: string,
    DB_NAME?: string
  ): Promise<Repository> {
    if (!this._instance && (!MONGO_URL || !DB_NAME)) {
      throw new Error("MONGO_URL and DB_NAME must be provided the first time");
    }

    if (!this._instance && MONGO_URL && DB_NAME) {
      const connection = await MongoClient.connect(MONGO_URL);
      this._instance = new this(connection, DB_NAME);
    }

    return this._instance;
  }

  public courses() {
    return this.coursesCol.find().toArray();
  }

  public students() {
    return this.studentsCol.find().toArray();
  }

  public student(id: string) {
    return this.studentsCol.findOne({ _id: new ObjectId(id) });
  }

  public course(id: string) {
    return this.coursesCol.findOne({ _id: new ObjectId(id) });
  }

  public async addCourse(course: Course) {
    const newCourse = await this.coursesCol.insertOne(course);

    if (!newCourse) {
      throw new Error("Failed to add course");
    }

    return { ...course, _id: newCourse.insertedId };
  }

  public async createPerson(studentData: Student) {
    const student = await this.studentsCol.insertOne(studentData);

    return { ...studentData, _id: student.insertedId };
  }

  public async editCourse(id: string, input: Partial<Course>) {
    const parsedId = new ObjectId(id);

    await this.coursesCol.updateOne({ _id: parsedId }, { $set: input });

    return this.coursesCol.findOne({ _id: parsedId });
  }

  public async editPerson(id: string, input: Partial<Student>) {
    const parsedId = new ObjectId(id);

    await this.studentsCol.updateOne({ _id: parsedId }, { $set: input });

    return this.studentsCol.findOne({ _id: parsedId });
  }

  public async addPeople(courseID: string, personID: string) {
    const parsedCourseID = new ObjectId(courseID),
      parsedPersonID = new ObjectId(personID);

    const course = await this.coursesCol.findOne({ _id: parsedCourseID }),
      person = await this.studentsCol.findOne({ _id: parsedPersonID });

    if (!course || !person) {
      throw new Error("course or person not found");
    }

    await this.coursesCol.updateOne(
      { _id: parsedCourseID },
      { $addToSet: { people: parsedPersonID } }
    );

    return course;
  }

  public deleteCourse(id: string) {
    return this.coursesCol.deleteOne({ _id: new ObjectId(id) });
  }

  public deleteStudent(id: string) {
    return this.studentsCol.deleteOne({ _id: new ObjectId(id) });
  }

  public async searchItems(keyword: string) {
    const courses = await this.coursesCol
      .find({ $text: { $search: keyword } })
      .toArray();

    const people = await this.studentsCol
      .find({ $text: { $search: keyword } })
      .toArray();

    return [...courses, ...people];
  }

  public async people(peopleID: string[]) {
    const ids = peopleID ? peopleID.map((id) => new ObjectId(id)) : [];

    const peopleData =
      ids.length > 0
        ? await this.studentsCol.find({ _id: { $in: ids } }).toArray()
        : [];

    return peopleData;
  }
}

export const Data = await Repository.Instance(MONGO_URL, DB_NAME);
