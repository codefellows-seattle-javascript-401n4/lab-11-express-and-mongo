'use strict';

// const server = require('./server');
// const mongodb = require("mongodb");
// const Promise = require('bluebird');
// const prom = Promise.promisify;
// const promAll = Promise.promisifyAll;

// const express = require('express');
// const bodyParser = require('body-parser').json();
// const Record = require('./record');
// const app = module.exports = express();

// app.post('/api/records', bodyParser, (req, res) =>{
//   console.log('sdfsdfsdfsdf')
//     connection.then(db => {
//         const col = promAll(db.collection('records'));
//         col.insertOneAsync(req.body)
//           .then(console.log)
//           .then(data=>send.res(data))
//           .catch(console.log)
//           .catch(() => res.status(500).send('server error'));
//         return db;
//       });
// })

// app.get('/api/records', (req, res) => {
//   let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
//   connection.then(db => {
//     const col = promAll(db.collection('records'));
//     col.findAsync(findQuery).then(cur => {
//       promAll(cur).toArrayAsync()
//       .then(res.send.bind(res))
//       .catch(console.log)
//       .catch(() => res.status(500).send('server error'));
//     })
//     return db;
//   });
// });

// app.delete('/api/records', bodyParser, (req, res)=>{
//   let findQuery = req.query.id ? {_id: mongodb.ObjectId(req.query.id)} : {};
//   connection.then(db => {
//     const col = promAll(db.collection('records'));
//     col.findAsync(findQuery).then(record=>
//       db.bacnet.deleteOne(record))
//       .then(res.send("sucsess!"))
//       .catch(console.log)
//       .catch(() => res.status(500).send('server error'));
//     })
//     return db;
//   });