'use strict';

const uuid = require('uuid/v1');

class Pokemon {
  constructor(data) {
    this.id = uuid();
    this.name = data.name,
    this.stats = data.stats,
    this.date = Date.now();
  }
}

module.exports = Pokemon;
