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


app.post('/api/notes', jsonParser, (req, res) => {

  if(!req.body.body){
    return res.status(400).send('No Content');
  }
  if(!req.body.title){
    return res.status(400).send('No Title');
  }

  let note = new Note(req.body);

  connection.then(db => {
    const collection = promAll(db.collection('notes'));
    collection.insertAsync(note)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(() => {
        res.status(500).send('Error with the server');
      });
    return db;
  });
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
