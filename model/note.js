'use strict';



const uuid = require('uuid/v1');



class Note {
  constructor(data){
    this.id = uuid();
    this.title = config.title;
    this.content = config.content;
    this.createdOn = Date.now();
  }
}



module.exports = Note;
