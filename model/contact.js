'use strict';



const uuid = require('uuid/v1');



class Contact {
  constructor(data) {
    this.id = uuid();
    this.name = data.name,
    this.profile = data.profile;
    this.date = Date.now();
  }
}



module.exports = Contact;
