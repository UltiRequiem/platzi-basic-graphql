import "dotenv/config";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./lib";
import { PORT } from "./config";

const app = express();

app.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
