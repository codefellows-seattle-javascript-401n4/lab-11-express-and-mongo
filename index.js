'use strict';

const express = require('express');
const promAll = require('bluebird').PromisfyAll;
const MongoClient = promAll(require('mongodb').MongoClient);
const connection = MongoClient.connectAsync('mongodb://localhost:27017/expressmongo');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => console.log(`server up on port: ${PORT}`));
