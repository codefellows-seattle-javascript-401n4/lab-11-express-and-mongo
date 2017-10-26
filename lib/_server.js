'use strict';

const express = require('express');
const bodyparser = require('body-parser').json();
const send = require('./response');
const Contact = require('../model/contact');
const contacts = __dirname + '/../model/contacts.json';
const store = require('./storage')(contacts);
const url = require('./urlparser');

const app = express();

app.use((req, res, next) => {

  url.parse(req);
  next();

});


app.get('/api/contacts', (req, res) => {

  let id = req.url.query.id;

  if(id) {

    store.getContactByID(id)
    .then(note => send.json(res, 200, note))
    .catch(err => send.status(res, 404, 'Not Found'));

  } else {

    send.status(res, 400, 'Bad Request');

  }

});

app.post('/api/contacts', bodyparser, (req, res) => {

  if(! req.body.name) return send.status(res, 400, 'Missing Name');
  if(! req.body.profile) return send.status(res, 400, 'Missing Profile');

  let contact = new Contact(req.body);
  store.saveContact(contact)
  .then(n => send.json(res, 200, n))
  .catch(err => send.status(res, 500, err));

});

app.delete('/api/contacts', function(req, res) {

  let id = req.url.query.id;

  if(id){

    store.deleteContact(id)
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
