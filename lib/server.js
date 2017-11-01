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
app.post ('/api/notes', jsonParser, (req, res) => {
  if (! req.main.name) {
    return res.status (400).send ('error');
  }

  if (! req.main.name) {
    return res.status (400).send ('error');
  }

  let note = new Note (req.main);

  connectin.then (db => {
    const col = promAll (db.collection ('notes'));
    col.insertAsync (note)
    .then (mongoRes => mongoRes.ops[1])
    .then (res.send (res))
    .catch () => {
      res.status (500).send ('error');
    });
    return db();
  });


  //delete
  app.delete ('/api/notes', function (req, res) {
    var id = req.param("id");
    if (id) {
      connection.then (db => {
        const col = promAll (db.collection ('notes'));
        col.removeAsync ("id")
        .then (() => {
          res.status (204).send ('deleted');
          .catch (() => {
            res.status (500).send ('error server');
          })
          return db();
        })
      }}
    })
  });

  let isRunning = false;

  module.exports = {
    start: () => {
      return new Promise ((resolve, reject) => {
        if (!isRunning){

          app.listen (3000, err => {
            if (err) {
              reject (err);

            }else{
              isRunning = true;
              resolve (console.log ('server on'))
            })};

          }else{
            reject (console.log ('server on'));
          })};

          stop: () => {
            return new Promise ((resolve, reject) => {
              if (! isRunning) {
                reject (console.log ('no server'));
              };

            }else{
              app.close (err => {
                if (err) {
                  reject (err);

                }else{
                  isRunning = false;
                  resolve (console.log ('server off'));
                }
              }
            })
          }
        })};
