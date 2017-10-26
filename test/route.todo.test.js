/*global beforeAll,afterAll,expect*/
'use strict';

process.env.PORT = 5000;
const server = require('../lib/server');
const superagent = require('superagent');
require('../todo/route');
const ToDo = require('../todo/model');
const url = `http://localhost:${process.env.PORT}/api/todos`;

jest.mock('../lib/parse-request', () => {
  return {
    parse: (req) => {},
  };
});


let writeHead = jest.spyOn;
