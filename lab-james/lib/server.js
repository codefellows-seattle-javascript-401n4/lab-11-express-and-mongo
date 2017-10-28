'use strict';

const Note = require('./Note.js');
const express = require('express');
const promAll = require('bluebird').promisifyAll;
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
const jsonParser = require('body-parser').json();

const app = express();

app.post('/api/notes', jsonParser, (req, res) => {
  if(!req.body.name){
    return res.status(400).send('Missing name');
  }

  if(!req.body.content){
    return res.status(400).send('Missing content');
  }

  let note = new Note(req.body);

  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync(note)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch( () => {
        res.status(500).send('server error');
      });
    return db;
  });
});

app.get('/api/notes', (req, res) => {
  console.log(req.query.id);
  let id = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};

  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.findAsync(id)
      .then(cur => {
        promAll(cur).toArrayAsync();
      })
      .then(res.send.bind(res))
      .catch( () => {
        res.status(500).send('server error');
      });
    return db;
  });
});

app.delete('/api/notes', (req, res) => {
  let id = req.query.id ? {_id: mongodb.ObjectID(req.query.id)} : false;

  if(id){
    connection.then(db => {
      const col = promAll(db.collection('notes'));
      col.removeAsync(id)
        .then( () => {
          res.status(204).send('Note delelted');
        })
        .catch( () => {
          res.status(500).send('server error');
        });
      return db;
    });
  } else {
    return res.status(400).send('ID required');
  }

});

app.listen(3000, () => {
  console.log('Server up');
});
