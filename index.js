'use strict';
const ToDo = require('./todo/model.js');
ToDo.loadAll();

require('./todo/route');
