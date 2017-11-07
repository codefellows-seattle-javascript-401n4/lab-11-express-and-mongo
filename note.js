'use strict';

const uuidv1 = require ('uuid/v1');
const mongoose = require ('mongoose');

class note {
  function (config) {
    this.uuid = uuid1();
    this.content = {type : String, required : true},
    this.created = {type : Date, required : true},
  }
};

module.exports = mongoose.model ('note')
