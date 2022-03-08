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

    course(_root, args) {
      return exampleCourses.find((course) => course._id === args.id);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs: readFromHere("schema.graphql"),
  resolvers,
});
