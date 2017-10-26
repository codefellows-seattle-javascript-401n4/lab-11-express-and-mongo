'use strict';

const express = require('express');
const Note = require(__dirname + '/note.js');
const jsonParser = require('body-parser').json();
const promAll = require('bluebird').promisifyAll;
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');

const app = module.exports = express();
 
app.post('/api/notes', jsonParser, (req,res) => {
  if(!req.body.name) return res.status(400).send('missing name');
  if(!req.body.wizard) return res.status(400).send('are you a wizard or not?');
  let data = new Note(req.body);
  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync(data)
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
        .then(cur => {
          if(cur.length===0) {
            res.status(404).send('a note with that ID does not exist');
          } 
          res.status(200).send(cur);
        })
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