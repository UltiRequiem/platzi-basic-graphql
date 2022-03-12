import { Data } from ".";

import type { IResolvers } from "@graphql-tools/utils";

export const resolvers: IResolvers = {
  Query: {
    courses() {
      return Data.courses();
    },

    course(_root, args: { id: string }) {
      return Data.course(args.id);
    },
  },
  Mutation: {
    createCourse(_root, { input }) {
      return Data.addCourse(input);
    },
  },
};
