import { readFromSyncGenerator } from "read-from-fs";

const readFromHere = readFromSyncGenerator(__dirname);

export const basic = readFromHere("schema.graphql");
