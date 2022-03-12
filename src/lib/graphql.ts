import { readFromSyncGenerator } from "read-from-fs";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { resolvers } from "./graphql_resolvers";

const readFromHere = readFromSyncGenerator(__dirname);

export const schema = makeExecutableSchema({
  typeDefs: readFromHere("schema.graphql"),
  resolvers,
});
