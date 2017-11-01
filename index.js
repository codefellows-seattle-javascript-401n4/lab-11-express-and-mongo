'use strict';

const PORT = process.env.PORT || 3000;
const app = require ('./lib/routes.js');

console.log (app);
app.listen (PORT, () => {
  console.log ('server on');
});
