'use strict';

const uuid = require('uuid/v1');

class Note {
  constructor(config){
    this.name = config.name;
    this.wizard = config.wizard;
  }
}

module.exports = Note;