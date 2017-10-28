'use strict';

const uuid = require('uuid/v1');

class Note {
    
  constructor(config) { 
    this.id = uuid();
    this.title = config.title;
    this.content = config.content;
    this.createdOn = new Date();
  } 
}

module.exports = Note;