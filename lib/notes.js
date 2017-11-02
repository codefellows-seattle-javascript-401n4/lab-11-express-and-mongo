'use strict';

const uuid = require ('uuid/v1');
class note {
  function (config) {
    this.uuid = uuid();
    this.content = config.content('');
    this.name = config.name('');
  }
}

module.exports = Note;
