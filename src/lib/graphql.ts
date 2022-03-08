import { readFromSyncGenerator } from "read-from-fs";
import { buildSchema } from "graphql";

import { Course, exampleCourses } from ".";

const readFromHere = readFromSyncGenerator(__dirname);

export const schema = buildSchema(readFromHere("schema.graphql"));

export const resolvers = {
  courses(): Course[] {
    return exampleCourses;
  },
};
