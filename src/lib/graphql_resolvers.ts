import { Database } from ".";

import type { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
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
