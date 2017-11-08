'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const promAll = require('bluebird');
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
const jsonParser = require('body-parser').json();
const Note = require('./note.js');


app.get('/', (req, res, next) => {
  res.send('HTTP Server');
  next();
});

app.get('/welcome', (req, res, next) => {
  res.send('welcome page');
  next();
});

app.use((req, res, next) => {
  res.status(404).send('Path does not exist');
  next();
});

app.listen(PORT, () => {
  console.log('Up and Running On PORT: ' + PORT);
});
