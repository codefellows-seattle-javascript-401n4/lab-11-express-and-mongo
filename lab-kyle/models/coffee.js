'use strict';

const uuidv1 = require('uuid/v1');

class Coffee {

  constructor(config){
    this.uuid = uuidv1();
    this.type= config.type || '';
    this.origin = config.origin || '';
  }
}

module.exports = Coffee;
