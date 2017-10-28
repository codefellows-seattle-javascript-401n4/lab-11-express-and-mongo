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
    //pass in the function that we want to call as opposed to passing an anonymous function
    //passing in the function db.close into the promise; we want to make sure that we are running db.close in the context of db so we are binding db.close back to db
    //if it's just .catch(db.close) then it would run it as an anymous function/as a callback instead of a method on db; it would no longer point to the db object; instead it would point to the context of the promise
    //if it's .catch(db.close()) then this function would be executed right there, not when the whole process finishes

    .catch(db.close.bind(db));
    //return db so that I can continue using const connection to do things with that DB
    return db;
  });

  connection.then(db => {
    const col = promAll(db.collection('notes'));
    //cur for cursor; cursor gives us access to the metadata of the request that we've have to Mongodb
    col.findAsync({}).then(cur => {
      promAll(cur).toArrayAsync()
        .then(console.log)
        .catch(console.log)
        .then(db.close.bind(db));
    });
  });
