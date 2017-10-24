'use strict';

const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/mongopromisify')
  .then(db => {
    const col = promAll(db.collection('notes'));
    //takes a javascript object and store all key value pairs into our database
    col.insertAsync({noteBody: 'this is my first note'})
    .catch(console.log)
    //if we don't close db then this file will stay open until we control C out of it
    .catch(db.close.bind(db));
    //return db so that I can continue using const connection to do things with that DB
    return db;
  });

  connection.then(db => {
    const col = promAll(db.collection('notes'));
    col.findAsync({}).then(cur => {
      promAll(cur).toArrayAsync()
        .then(console.log)
        .catch(console.log)
        .then(db.close.bind(db));
    });
  });
