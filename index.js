'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const promAll = require('bluebird').promisifyAll;
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
 
app.post('/api/notes', jsonParser, (req,res) => {
  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync(req.body)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    return db; 
  });
});

app.get('/api/notes', (req,res) => {
  let queryId = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.findAsync(queryId).then(cur => {
      promAll(cur).toArrayAsync()
        .then(res.send.bind(res))
        .catch(console.log)
        .catch(() => res.status(500).send('server error'));
      return db;
    });
  });
});

app.delete('/api/notes', (req,res) => {
  let queryId = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : false;
  if(queryId){
    connection.then(db => {
      const col = promAll(db.collection('notes'));
      col.removeAsync(queryId)
        .then(() => res.status(204).send('note deleted!'))
        .catch(console.log)
        .catch(() => res.status(500).send('server error'));
      return db;
    });
  } else {
    res.status(400).send('no ID given');
  }
});

app.listen(PORT, () => console.log(`server up on port: ${PORT}`));