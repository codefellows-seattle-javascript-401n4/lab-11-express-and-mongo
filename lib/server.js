'use strict';


const mongodb = require ('mongodb');
const Note = require ('./Note.js');
const express = require ('express');
const promAll = require ('bluebird');
const MongoClient = promAll (mongodb.MongoClient);
const connection = MongoClient.connectAsync ('mongodb://localhost:27017/expressmongo');
const jsonParser = require ('body-parser').json();

const app = express ();

//get
app.get ('/api/notes', (req, res) => {

var id = req.query.id

const col = promAll (db.collection ('notes'));
  col.findOne ({"_id.$oid" : id)
  .then (cur => {
    promAll (cur).toArrayAsync()
    .then (data => res.status (200).send (data))
    .catch (() => {
      res.status (500).send ('error');
    };
    return db;
  })));

catch (err) {
  res.status (400).send ('error id');
}
}};

//post
