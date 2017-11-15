'use strict';

const express = require('express');
const Promise = require('bluebird');
const jsonParser = require('body-parser').json();
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/api/notes', jsonParser, (req, res) => {
  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.insertAsync(req.body)
      .then(mongoRes => mongoRes.op[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500)).send('server error');
    return db;
  });
});


// app.get('/api/notes', (req, res, next) => {
//   res.send('welcome page');
//   next();
// });
//
// app.use((req, res, next) => {
//   res.status(404).send('Path does not exist');
//   next();
// });

app.listen(PORT, () => {
  console.log('Up and Running On PORT: ' + PORT);
});
