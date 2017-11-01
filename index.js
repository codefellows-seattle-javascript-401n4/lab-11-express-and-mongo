'use strict';

const app = require('./lib/server.js');
require('dotenv').config();
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log('server is connected on port: ' + PORT ));
