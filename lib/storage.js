'use strict';

let fs = require('fs-extra');

class Storage {

  constructor(db) {

    this.databaseFile = db;
    
    fs.pathExists(this.databaseFile)
      .then(exists => ! exists && fs.outputJson(this.databaseFile, {}));

  }

  getItems() {
    return fs.readJson(this.databaseFile);
  }
  

  getItem(id) {
    return new Promise((resolve, reject) => {
      if (! id) { reject('No ID Provided'); }
      this.getItems()
        .then(item  => { 
        if(item[id]) resolve(item[id]);
        else reject(); })
        .catch(err => reject(err));
    });
  }

  saveItem(item) {
    
    return new Promise((resolve, reject) => {
      //read in db
      this.getItems()
        .then(data => {
          data[item.id] = item;
          let dataToSave = JSON.stringify(data);
          fs.outputFile(this.databaseFile, dataToSave)
            .then(resolve(item))
            .catch(reject());
        });
    });
  }

  deleteItem(id) {
    return new Promise((resolve, reject) => {
      if (! id) { reject('No ID Provided'); }
      this.getItems()
        .then(data => {
          if(data[id]) {
            delete data[id];
            let dataToSave = JSON.stringify(data);
            fs.outputFile(this.databaseFile, dataToSave)
              .then(resolve())
              .catch(reject());
          }
        })
        .catch(err => reject(err));
    });
  }
}
module.exports = (db) => { return new Storage(db); };

