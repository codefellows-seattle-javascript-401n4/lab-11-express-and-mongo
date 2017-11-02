'use strict';

const uuidv1 = require ('uuid/v1');

class note {
  function (config) {
    this.uuid = uuid1();
    this.content = config.content('');
    this.name = config.name('');
  }
}

module.exports = Note;
