'use strict';
const fs = require('fs-extra');

class Storage {
  constructor(db) {
    this.data = db;
    fs.pathExists(this.data)
    .then(extant => ! extant && fs.output(this.data,  {}));
  }
  getPokemon(){
    return fs.readJson(this.data);
  }
  getPokemonByID(id) {
    return new Promise((resolve, reject) => {
      this.getPokemon()
        .then(contact => {
          if(contact[id]) resolve(contact[id]);
          else reject();
        });
    });
  }
  savePokemon(contact){
    return new Promise((resolve, reject) => {
      this.getPokemon()
        .then(pokeData => {
          pokeData[contact.id] = contact;
          fs.outputFile(this.data, JSON.stringify(pokeData))
            .then(resolve(contact))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
  deletePokemon(id){
    return new Promise((resolve, reject) => {
      if(!id) reject('Send an ID to find a pokemon.');
      this.getPokemon()
        .then(resolve())
        .catch(err => reject(err));
    });
  }
}

module.exports = (db) => {
  return new Storage(db);
};
