'use strict';

const PORT = process.env.PORT || 3000;

const app = express();


//work from here
const Promise = require('bluebird');
const prom = Promise.promisify;
const promAll = Promise.promisifyAll;
const MongoClient = promAll (require ('mongodb').MongoClient);
const connection = MongoClient.connectAsync('mongdb://localhost : 27017/mongopromisify')
  .then(db => {
    const col = promAll(db.collecton('notes'));

})


















app.listen(3000);
