'use strict';

//from lab code.

const express = require('express');
const promAll = require('bluebird').promisifyAll;
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
const jsonParser = require('body-parser').json();

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/api/notes', jsonParser, (req, res) => {
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

app.get('/api/notes', (req, res) => {
  let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.findAsync(findQuery).then(cur => {
      promAll(cur).toArrayAsync()
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    })
    return db;
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
    res.status(400).send('badID');
  }
});

app.listen(PORT, () => console.log('server up on port: ' + PORT))

///////////////////////////////////////////////////????
///tyler part 2

const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
  .then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync({noteBody: 'here is our first note'})
    .catch(console.log)
    .catch(db.close.bind(db))
    return db;
  });

connection.then(db => {
  const col = promAll(db.collection('notes'));
  col.findAsync({}).then(cur => {
    promAll(cur).toArrayAsync()
      .then(console.log)
      .catch(console.log)
      .then(db.close.bind(db))
  })
})
