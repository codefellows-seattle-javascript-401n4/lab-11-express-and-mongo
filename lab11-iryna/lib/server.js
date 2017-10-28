'use strict';

const PORT = process.env.PORT || 3000;
const mongodb = require("mongodb");
const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;

const express = require('express');
const bodyParser = require('body-parser').json();
const Record = require('./record');
const app = module.exports = express();

const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/bacnet');

app.post('/api/records', bodyParser, (req, res) =>{
    connection.then(db => {
        const col = promAll(db.collection('records'));
        col.insertAsync(req.body)
        .then(mongoRes => mongoRes.ops[0])
        .then(res.send.bind(res))
        .then(console.log)
        .catch(console.log)
        .catch(() => res.status(500).send('server error'))
        return db;
      })
})

app.get('/api/records', (req, res) => {
  let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('records'));
    col.findAsync(findQuery).then(cur => {
      promAll(cur).toArrayAsync()
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
      // return db;
    })
    return db
  });
});

app.delete('/api/records', bodyParser, (req, res)=>{
  let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('records'));
      col.remove({_id: mongodb.ObjectId(req.query.id)})
      .then(res.send("success!"))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
      return db;
    })
  });


  app.listen(PORT, () => console.log('server up on port: ' + PORT));
