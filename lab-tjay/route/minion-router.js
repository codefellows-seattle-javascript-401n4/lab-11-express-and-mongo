'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Minion = require('../model/minion.js');

let minionRouter = module.exports = new Router();

minionRouter.post('/api/minions', jsonParser, (req, res, next) => {
  console.log('viewing /api/minions');

  req.body.created = new Date();

  new Minion(req.body)
    .save()
    .then(minion => res.json(minion))
    .catch(next);
});

minionRouter.get('/api/minion/:id', (req, res, next) => {
  console.log('hit get /api/minion/:id');

  Minion.findById(req.params.id)
    .then(minion => res.json(minion))
    .catch(next);
});
