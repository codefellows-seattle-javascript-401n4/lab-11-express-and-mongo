'use strict';


const url = require('url');
const querystring = require('querystring');

const parser = module.exports = (req) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  return new Promise((resolve,reject) => {

  })
}
