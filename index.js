import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

class Root {
  hello() {
    return "Hello world!";
  }
}

graphql({
  schema,
  source: "{ hello }",
  rootValue: new Root(),
}).then(console.log);
