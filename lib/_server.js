'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const send = require('./response');
const Note = require('../models/note');
const notes = __dirname + '/../models/notes.json';
const storage = require('./storage')(notes);
const parser = require('./parse');

const app = express();

app.use((req, res, next) => {

  parser(req);
  next();

});


app.get('/api/notes', (req, res) => {

  let id = req.url && req.url.query && req.url.query.id;

  if(id) {

    storage.getItem(id)
    // console.log(storage.getItem())
    .then(item => send.json(res, 200, item))
    .catch(err => send.status(res, 404, 'Not Found'));
    
    

  } else {

    send.status(res, 400, 'Bad Request');

  }

});

app.post('/api/notes', jsonParser, (req, res) => {

  if(! req.body.title) return send.status(res, 400, 'Missing Title');
  if(! req.body.content) return send.status(res, 400, 'Missing Content');

  let note = new Note(req.body);
  storage.saveItem(note)
  .then(jsonRes => send.json(res, 200, jsonRes))
  .catch(err => send.status(res, 500, err));
});

app.delete('/api/notes', (req, res) => {

  let id = req.url.query.id;

  if(id){

    storage.deleteItem(id)
    .then(send.json(res, 204))
    .catch(err => send.status(res, 500, err));

  } else {
    send.status(res, 400, 'Bad Request');
  }

});

app.get('*', (req, res) => {

  send.status(res, 404, 'Page Does Not Exist');

});


module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};