'use strict';


require ('dotenv').config ()
const server = require ('./lib/server.js');
const app = require ('./lib/notes.js');


/*
console.log (app);
app.listen (PORT, () => {
  console.log ('server on');
});
