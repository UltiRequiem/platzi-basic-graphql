import { readFromSyncGenerator } from "read-from-fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { Course, Database } from ".";

import type { IResolvers } from "@graphql-tools/utils";

const readFromHere = readFromSyncGenerator(__dirname);

const resolvers: IResolvers = {
  Query: {
    async courses(): Promise<Course[]> {
      return Database.courses();
    },

    course(_root, args: { id: string }) {
      return Database.course(args.id);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs: readFromHere("schema.graphql"),
  resolvers,
});
