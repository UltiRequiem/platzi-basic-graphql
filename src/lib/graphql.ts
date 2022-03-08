import { readFromSyncGenerator } from "read-from-fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { Course, exampleCourses } from ".";

import type { IResolvers } from "@graphql-tools/utils";

const readFromHere = readFromSyncGenerator(__dirname);

const resolvers: IResolvers = {
  Query: {
    courses(): Course[] {
      return exampleCourses;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs: readFromHere("schema.graphql"),
  resolvers,
});
