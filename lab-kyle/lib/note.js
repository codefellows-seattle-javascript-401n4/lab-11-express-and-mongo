'use strict';

const uuidv1 = require('uuid/v1');

class Note {

  constructor(config){
    this.uuid = uuidv1();
    this.title = config.title || '';
    this.body = config.body || '';
  }
}

module.exports = Note;
