'use strict';

const mongodb = require('mongodb');
const jsonParser = require('body-parser').json();
const express = require('express');
const promAll = require('bluebird').promisifyAll;
const MongoClient = promAll(mongodb.MongoClient);
const Cat = require('../models/cat.js');
const connection = MongoClient.connectAsync('mongodb://localhost:27017/mongoCatdb');

const app = module.exports = express();

app.post('/api/cats', jsonParser, (req,res) => {
  if(!req.body.name){
    res.status(400).send('Whats the cats name?');
  }
  if(!req.body.favToy){
    res.status(400).send('Every cat has a favorite toy');
  }
  let data = new Cat(req.body);
  connection.then(db => {
    const col = promAll(db.collection('cats'));
    col.insertAsync(data)
    .then(mongoRes => mongoRes.ops[0])
    .then(res.send.bind(res))
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
        if(cur === !req._id) {
          res.status(404).send('a cat with that ID does not exist');
        }
        res.status(200).send(cur);
      })
      .catch(() => res.status(500).send('server error'));
      return db;
    });
  });
});

app.delete('/api/cats', (req,res) => {
  let queryId = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : false;
  if(queryId){
    connection.then(db => {
      const col = promAll(db.collection('cats'));
      col.removeAsync(queryId)
      .then(() => res.status(204).send('Meow you later!!!'))
      .catch(() => res.status(500).send('server error!'));
      return db;
    });
  } else {
    res.status(400).send('no ID given');
  }
});
