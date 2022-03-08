import "dotenv/config";

import { buildSchema } from "graphql";

import express from "express";

import { graphqlHTTP } from "express-graphql";

import { basic } from "./graphql";

import { connectDB } from "./lib";

connectDB();

const app = express();

const port = process.env.PORT || 4000;

const schema = buildSchema(basic);

class Resolvers {
  hello() {
    return "Hello world!";
  }

  time() {
    return new Date().toLocaleTimeString();
  }
}

app.use(
  "/api",
  graphqlHTTP({
    schema,
    rootValue: new Resolvers(),
    graphiql: true,
  })
);

app.listen(port);
