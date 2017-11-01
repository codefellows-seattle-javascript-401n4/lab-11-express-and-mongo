'use strict';

module.exports = app;

'use strict';

const mongodb = require ('mongodb');
const Note = require ('./Note.js');
const express = require ('express');
const promAll = require ('bluebird');
const MongoClient = promAll (mongodb.MongoClient);
const connection = MongoClient.connectAsync ('mongodb://localhost:27017/expressmongo');
const jsonParser = require ('body-parser').json();

const app = express ();

//post
