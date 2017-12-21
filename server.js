'use strict';



require('dotenv').config();
require('./lib/_server').start(process.env.PORT);

/*
console.log (app);
app.listen (PORT, () => {
  console.log ('server on');
});
*/
