'use strict';

const uuid = require('uuid/v1');


class Cat {
  constructor(config){
    this.name = config.name;
    this.favToy = config.favToy;
  }
}
module.exports = Cat;
