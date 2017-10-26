'use strict';

const app = require(__dirname + '/lib/server.js');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server up on port: ${PORT}`));