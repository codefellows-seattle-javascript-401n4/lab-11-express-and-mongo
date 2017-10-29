'use strict';

const uuid = require('uuid/v1');

class Note {

  constructor(config){
    this.uuid = uuid();
    this.name = config.name || '';
    this.content = config.content || '';
  }
}

module.exports = Note;
