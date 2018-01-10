import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";

import { root, schema } from "./schema";
const port = process.env.PORT || 4000;

// Mongoose config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db:27017/local', { useMongoClient: true });
const db = mongoose.connection;
db.on('error', ()=> console.log( '---FAILED to connect to mongoose'));
db.once('open', () => console.log( '+++Connected to mongoose'));

// Express config
const app = express();

const allowDomains = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
  //move on
    next();
  }
}

app.use(allowDomains);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: process.env.NODE_ENV !== 'production',
}));

app.listen(port);
console.log('Running a GraphQL API server at localhost:4000/graphql');