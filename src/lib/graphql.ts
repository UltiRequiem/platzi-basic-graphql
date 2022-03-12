import { readFromSyncGenerator } from "read-from-fs";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { dirname } from "dirname-filename-esm";

import { resolvers } from "./graphql_resolvers";

const __dirname = dirname(import.meta);

const readFromHere = readFromSyncGenerator(__dirname);

export const schema = makeExecutableSchema({
  typeDefs: readFromHere("schema.graphql"),
  resolvers,
});
