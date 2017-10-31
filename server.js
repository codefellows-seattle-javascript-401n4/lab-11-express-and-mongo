'use strict';


const url = require('url');
const querystring = require('querystring');
const express = require('express');
const debug = require('debug')('express');
const response = require('../lib/response.js');
const Sushi = require('./lib/sushi.js');
const app = express();
const jsonParser = require('body-parser').json();
const databaseFile = __dirname + '../lib/data/sushi.dat';
const storage = require('../lib/storage.js')(databaseFile);


app.use()
app.get('/api/sushi', (req,res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  let id = req.url && req.url.query && req.url.query.id;

  if(id){
    storage.getItem(id)
    .then( item => response.sendJSON(res,200,item))
    .catch(err => response.sendStatus(res,404,err));
  }
  else{
    storage.getItems()
    .then(allID => response.sendJSON(res,200,allID))
    .catch(err => response.sendStatus(res,400,err));
  }
});


app.post('/api/sushi', (jsonParser, res, res) => {

});
