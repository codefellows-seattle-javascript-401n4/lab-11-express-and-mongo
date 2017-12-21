'use strict';



const fs = require('fs-extra');



class Storage {
  constructor(db) {
    this.dataFile = db;
    fs.pathExists(this.dataFile)
    .then( exists => ! exists && fs.outputJson(this.dataFile, {}));
  }


  getAllContacts() {
    return fs.readJson(this.dataFile);
  }


  getContactByID(id) {
    return new Promise ((resolve, reject) => {
      this.getAllContacts()
      .then(contact => {
        if(contact[id]) resolve(contact[id]);
        else reject(); })
        .catch(err => reject(err));
      });
    }


    saveContact(contact) {
      return new Promise ((resolve, reject) => {
        this.getAllContacts()
        .then(data => {
          data[contact.id] = contact;
          fs.outputFile(this.dataFile, JSON.stringify(data))
          .then(resolve(contact))
          .catch(err => reject(err));
        })
        .catch(err => reject(err));
      });
    }


    deleteContact(id) {
      return new Promise((resolve, reject) => {
        if(!id) { reject('No ID Provided'); }
        this.getAllContacts()
        .then(contact => {
          if(contact[id]) {
            delete contact[id];
            fs.outputFile(this.dataFile, JSON.stringify(contact))
            .then(resolve())
            .catch(err => reject(err));
          }
        });
      });
    }
  }



  module.exports = (db) => { return new Storage(db); };
