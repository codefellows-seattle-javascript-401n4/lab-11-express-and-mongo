'use strict';


const url = require('url');
const querystring = require('querystring');
const express = require('express');
const debug = require('debug')('express');
const response = require('../lib/response.js');
const Sushi = require('../model/sushi.js');
const app = express();
const jsonParser = require('body-parser').json();
const databaseFile = __dirname + "../model/data/sushi.dat";
const storage = require('../lib/storage.js')(databaseFile);
const parser = require('../lib/parser.js');



app.post('/api/sushi', jsonParser, (req,res) => {
  if(!(req.body.name && req.body.fish)){
    return response.status(res,400, 'missing body');
  }

  let sushi = new Sushi(req.body.name,req.body.fish);
  storage.saveItem(sushi)
  .then( item => response.json(res,200,item))
  .catch(err => response.status(res,400,err));
});
app.get('/api/sushi', (req,res) => {
  let id = req.query.id;
  if(id){
    storage.getItem(id)
    .then( item => response.json(res,200,item))
    .catch( err => response.status(res,404,err));
  }
  else{
    storage.getItems()
    .then( allID => response.json(res,200, allID))
    .catch( err => response.status(res,400,err));
  }
});
app.delete('/api/sushi', (req,res) => {
  let id = req.query.id;
  console.log(id);
  if(id){
    storage.deleteItem(id)
    .then(response.json(res,204,'ok'))
    .catch(err => response.status(res,404,err));
  }
});
app.use('*', (req,res) => {
  response.status(res,400,'bad page')
});
module.exports = {
  start: (port,cb) => {
    app.listen(port,cb);
    console.log(`server started on ${process.env.PORT}`);
  },
  stop: (cb) => app.close(cb),
};
