'use strict';


const mongoose = require ('mongoose');
const express = require ('express');

mongoose.Promise = Promise
mongoose.connect (process.env.MONGODB_URI)

let server;

const app = express ();


//get
app.get ('/api/notes', (req, res, next) => {
  res.send ('test')
})


app.use (require ('../route/router.js'))

app.use ((err, req, res, next) => {
  res.sendStatus (500)
})


const serverControl = module.exports = {}

serverControl.start = () => {
  return new Promise ((resolve) => {
    server = app.listen (process.env.PORT, () => {
      console.log ('server on', process.env.PORT)
      server.isOn = true;
      resolve()
    })
  })
};

serverControl.stop = () => {
  return new Promise ((resolve) => {
    server.close () => {
      console.log ('server off')
      server.isOn = false;
      resolve()
    }
  })
};
