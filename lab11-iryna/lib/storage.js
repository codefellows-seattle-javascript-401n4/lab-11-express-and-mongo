'use strict';

const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;

const Record = require('./record.js');
const fs = require('fs-extra');
// const fsys = require('fs');
const MongoClient = promAll(require('mongodb').MongoClient);
let readFile = prom(require('fs').readFile);

const connection = MongoClient.connectAsync('mongodb://localhost:27017/bacnet')
.then(db => {
    const col = promAll(db.collection('records'));
    readFile('./data/text.csv')
    .then(data => {
        // console.log(data.toString());
        let notes= data.toString();
        let notesArray = notes.split('\n');
        for (let i=0; i<notesArray.length; i++){
            let recordData = notesArray[i].split(',');
            let record = new Record(recordData);
            notesArray[i]=record;
        }
        col.insertManyAsync(notesArray)
        .then(console.log)
        .catch(console.log);
        // console.log(col);
        return db;
    })
    .then(db.close.bind(db))
    .catch(err => console.log(err))
    
  })