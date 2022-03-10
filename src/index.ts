import "dotenv/config";

import express from "express";

import { graphqlHTTP } from "express-graphql";
import { schema } from "./lib";

import { PORT, PRODUCTION } from "./config";

const app = express();

app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: !PRODUCTION,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
