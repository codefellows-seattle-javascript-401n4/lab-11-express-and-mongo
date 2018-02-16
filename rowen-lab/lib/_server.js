'use strict';

const express = require ('express');
const bodyparser = require ('body-parser').json();
const send = require('./response');
const Pokemon = require('../model/pokemon.js');
const pokedex = require('/../model/pokedex.json');
const save = require('./storage')(pokedex);

const url = require('./urlparser');

const app = express();

app.use((req, res,next) => {
  url.parse(req);
  next();
});

app.get('/api/pokdex', (req, res) => {
  if(req.url.query.id){
    let id = req.url.query.id;
    save.getContactByID(id)
      .then(entry => send.json(req, 200, entry))
      .catch(err => send.status(res, 404, 'Not Found'));

  } else {
    send.status(res, 400, 'Bad Request');
  }
});

app.delete('api/pokedex', (req, res) => {
  if(!req.body.name) return send.status(res, 400, 'Invalid search.');
  if(!req.body.profile) return send.status(res, 40, 'Pokemon not found.');
  let pokemon = new Pokemon(req.body);
  save.savePokemon(pokemon)
    .then(data => send.json(res, 200, data))
    .catch(err => send.status(res, 500, err));
});

app.delete('api/contact', (req, res) => {
  if(req.url.query.id){
    let id = req.url.query.id;
    save.deletePokemon(id)
      .then(send.json(res, 204))
      .catch(err => send.status(res, 500, err));

  } else {
    send.status(res, 400, 'Bad Request');
  }
});

app.get('*', (req, res) => {
  send.status(res, 404, 'The page you requested does not exist.');
});

module.exports = {
  start: (port, cb) => {
    app.listen(port, cb);
    console.log(`Server live on PORT ${process.env.PORT}!`);
  },

  stop: (cb) => app.close(cb),
};
