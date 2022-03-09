import { readFromSyncGenerator } from "read-from-fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { Database } from ".";

import type { IResolvers } from "@graphql-tools/utils";

const readFromHere = readFromSyncGenerator(__dirname);

const resolvers: IResolvers = {
  Query: {
    courses() {
      return Database.courses();
    },

    course(_root, args: { id: string }) {
      return Database.course(args.id);
    },
  },
  Mutation: {
    createCourse(_root, { input }) {
      return Database.addCourse(input);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs: readFromHere("schema.graphql"),
  resolvers,
});
