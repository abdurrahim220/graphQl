const express = require("express");
const path = require('path');
require("dotenv").config();
const colors = require("colors");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./server/schema/schema");
const connectDB = require("./server/config/db");
const port = process.env.PORT || 5000;

// const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  connectDB();
  console.log(`server is running on port ${port}`);
});
