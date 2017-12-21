'use strict';



const express = require('express');
const jsonParser = require('body-parser').json();
const Note = require('../models/note');
const notes = __dirname + '/..models/notes.json';
const send = require('./response');
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
    .then(item => send.json(res, 200, item))
    .catch(err => send.status(res, 404, 'not found'));

  } else {

    send.status(res, 400, 'bad request');
  }
});



app.post('/api/notes', jsonParser, (res, res) => {
  if(! req.body.title)
  return send.status(res, 400, 'title missing');

  if(! req.body.content)
  return send.status(res, 400, 'content missing');

  let note = new Note(req.body);
  storage.saveItem(note)
  .then(jsonRes => send.json(res, 200, jsonRes))
  .catch(err => send.status(res, 500, err));
});



app.delete('/api/notes', (req, res) => {
  let id = req.url.query.id;

  if(id) {
    storage.deleteItem(id)
    .then(send.json(res, 204))
    .catch(err => send.status(res, 500, err));

  } else {

    send.status(res, 400, 'bad request');
  }
});



app.get('*', (req, res) => {
  send.status(res, 404, 'does not exists');
});



module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`server is up on PORT ${process.env.PORT}!`);
  },
  stop: (cb) => app.close(cb),
};
