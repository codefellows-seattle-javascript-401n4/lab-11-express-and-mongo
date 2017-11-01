'use strict';

const mongodb = require('mongodb');
const jsonParser = require('body-parser').json();
const express = require('express');
const promAll = require('bluebird').promisifyAll;
const MongoClient = promAll(mongodb.MongoClient);
const Cat = require('../cat.js');
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');

const app = module.exports = express();

app.post('/api/cats', jsonParser, (req,res) => {
  (!req.body.name) ? res.status(400).send('Whats the cats name?'): null;

  (!req.body.favToy)? res.status(400).send('Every cat has a favorite toy'): null;

  let data = new Cat(req.body);
  connection.then(db => {
    const col = promAll(db.collection('cats'));
    col.insertAsync(data)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    return db;
  });
});

app.get('/api/cats', (req,res) => {
  let queryId = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('cats'));
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
