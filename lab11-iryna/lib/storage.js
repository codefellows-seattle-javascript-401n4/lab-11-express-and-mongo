'use strict';
const server = require('./server');
const mongodb = require("mongodb");
const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;

const Record = require('./record.js');
const fs = require('fs-extra');
const MongoClient = promAll(require('mongodb').MongoClient);
let readFile = prom(require('fs').readFile);

MongoClient.connectAsync('mongodb://localhost:27017/bacnet')
.then(db => {
    const col = promAll(db.collection('records'));
    readFile('./data/text.csv')
    .then(data => {
        // console.log(data.toString());
        let notes= data.toString();
        let notesArray = notes.split('\n');
        for (let i=0; i<notesArray.length; i++){
            let recordData = notesArray[i].split(',');
            let recordTemp = new Object({barcode:recordData[0],antibiotic:recordData[1],site:recordData[2],species:recordData[3],sex:recordData[4],
                age:recordData[5], inout:recordData[6], recommended:recordData[7], resistance:recordData[8]});
            let record = new Record(recordTemp);    
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