const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const resolvers = require('./resolvers');
const cors = require(`cors`);

const schema = buildSchema(`
  type File {
    name: String!
    path: String!
    size: Int!
    extension: String!
    created: String!
    permissions: String!
    isDirectory: Boolean!
  }

  type Query {
    listDirectory(path: String!, limit: Int, offset: Int): [File]
  }
`);

const app = express();

app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: resolvers,
        graphiql: true,
    })
);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}/graphql`);
});