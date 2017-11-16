'use strict';

const express = require('express');
const Coffee = require('../models/coffee.js');
const Promise = require('bluebird');
const jsonParser = require('body-parser').json();
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');

const app = module.exports = express();
const PORT = process.env.PORT || 3000;

app.post('/api/coffee', jsonParser, (req, res) => {
  if(!req.body.type){
    res.status(400).send('What type of coffee?');
  }
  if(!req.body.origin){
    res.status(400).send('Where did the coffee com from?');
  }

  let data = new Coffee(req.body);

  connection.then(db => {
    const col = promAll(db.collection('coffee'));
    col.insertAsync(data)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500)).send('server error');
    return db;
  });
});


app.get('/api/coffee', (req, res) => {
  connection.then(db => {
    let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
    const col = promAll(db.collection('coffee'));
    col.findAsync(findQuery).then(cur => {
      promAll(cur).toArrayAsync()
        .then(res.send.bind(res))
        .catch(console.log)
        .catch(() => res.status(500).send('server error'));
    });
    return db;
  });
});

app.delete('/api/coffee', (req, res) => {
  let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : false;
  if(findQuery){
    connection.then( db => {
      const col = promAll(db.collection('coffee'));
      col.removeAsync(findQuery)
        .then(() => res.status(204).send('content deleted'))
        .catch(console.log)
        .catch(() => res.status(500).send('server error'));
      return db;
    });
  } else {
    res.status(400).send('need id');
  }
});

app.listen(PORT, () => {
  console.log('Up and Running On PORT: ' + PORT);
});
