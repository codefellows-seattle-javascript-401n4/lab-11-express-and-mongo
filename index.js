'use strict';
const ToDo = require('./todo/model.js');
const PORT = process.env.PORT || 2000;
const express = require('express');
const app = express();
const server = require('./lib/server');
const jsonParser = require('body-parser').json();
const routes = require('./todo/route');


app.post('/api/todos', jsonParser, routes.post);

app.get('/api/todos', routes.get);

app.delete('/api/todos', routes.delete);

app.use('/api/todos', (err, req, res, next) => {
  if (err) {
    console.log(err);
    let status = err.status || 400;
    let message = err.message || 'oh no server error';
    return res.status(status).send(message);
  }
});

ToDo.loadAll();

server.start(app, PORT)
  .then(console.log)
  .catch(console.log);
