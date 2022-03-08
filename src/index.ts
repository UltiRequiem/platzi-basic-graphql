import "dotenv/config";

import express from "express";

import { graphqlHTTP } from "express-graphql";

import { connectDB, resolvers, schema } from "./lib";

connectDB();

const app = express();

const port = process.env.PORT || 4000;

app.use(
  "/api",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port);
