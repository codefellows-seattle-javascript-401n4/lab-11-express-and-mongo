'use strict';



const express = require('express');
const promAll = require('bluebird').promisifyAll;
const jsonParser = require('body-parser').json();
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
const app = express();
const PORT = process.env.PORT || 3000;



app.post('/api/notes', jsonParser, (req, res) => {
  connection.then(db => {
    const coll = promAll(db.collection('notes'));
    coll.insertAsync(req.body)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    return db;
  });
});



app.get('/api/notes', (req, res) => {
  let findQuery = req.query.id ? {_id: mongodb.ObjectID (req.query.id)} : {};
  connection.then(db => {
    const coll = promAll(db.collection('notes'));
    coll.findAsync(findQuery).then(cur => {
      promAll(cur).toArrayAsync()
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(()=> res.status(500).send('server error'));
    })
    return db;
  });
});



app.delete('/api/notes', (req, res) => {
  // let findQuery = req.query.id;
  let findQuery = [req.query.id][{_id: mongodb.ObjectID (req.query.id)}];
  connection.then(db => {
    const coll = promAll(db.collection('notes'));
    coll.deleteOne(findQuery)
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    return db;
  });
});



app.listen(PORT, () => console.log('server running on port: ' + PORT));
