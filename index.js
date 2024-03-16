const express = require("express");
require("dotenv").config();
const colors = require('colors');
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/schema");
const connectDB = require("./server/config/db");
const port = process.env.PORT || 5000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  connectDB()
  console.log(`server is running on port ${port}`);
});
