'use strict';

const express = require('express');
//promisifyAll will do it for all methods on an object
const promAll = require('bluebird').promisifyAll;
const mongodb = require('mongodb');
const MongoClient = promAll(mongodb.MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
const jsonParser = require('body-parser').json(); //to provide req.body

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/api/notes', jsonParser, (req,res) => {
  connection.then(db => {
    const col = promAll(db.collection('Restaurants'));
    if(req.body) {
    col.insertAsync(req.body)
      .then(mongoRes => mongoRes.ops[0])
      .then(res.send.bind(res))
      .catch(console.log)
      .catch(() => res.status(500).send('server error'));
    } else if ((req.body === null) || (req.body === '')) {
      res.status(400).send('Missing Body');
    }
    return db;
  });
});

app.get('/api/notes', (req,res) => {
  let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('Restaurants'));
    if(req.query.id) {
      col.findAsync(findQuery).then(cur => {
        //console.log(`!!!!!!!!!cursor is : `, cur);
        if(cur.count() === 0) {
          res.status(404).send('No Matching ID');
        } else {
          promAll(cur).toArrayAsync()
            .then(res.send.bind(res))
            .catch((err) => console.log(`error: `, err))
            .catch(() => res.status(500).send('Server Error'));
        }
      });
      //.catch(() => res.status(404).send('Invalid ID'));
    } else {
      res.status(400).send('Missing Query ID');
    }
    return db;
  });
});

app.delete('/api/notes', (req,res) => {
  console.log('hi before findQuery');
  let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
  connection.then(db => {
    const col = promAll(db.collection('Restaurants'));
    if(req.query.id) {
      col.removeAsync(findQuery).then(() => {
        res.status(204).send('');
      })
      .catch(console.log)
      .catch(() => res.status(500).send('Server Error'));
    } else {
      res.status(404).send('Missing Query ID');
    }
  });
});

app.listen(PORT, () => console.log(`Server up on port: `, PORT));

module.exports = app;
