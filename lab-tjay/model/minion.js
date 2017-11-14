
'use strict';

const uuid = require('uuid/v1');

class Minion {

  constructor(config){
    this.uuid = uuid();
    this.minionName = config.name || '';
    this.minionRank = config.content || '';
  }
}

module.exports = Minion;