'use strict';

const uuid = require('uuid/v1');
const fs = require('fs-extra');
const db = './data/toDos.json';

class ToDo {

  constructor(opts) {
    this.id = opts.id || uuid();
    this.date = new Date();
    this.deadline = opts.deadline || null;
    this.task = opts.task;
    this.description = opts.description || null;
  }

  // Instance (prototype) Methods

  deleteToDo(){
    ToDo.allToDos[this.id] = null;
    delete ToDo.allToDos[this.id];
    return new Promise(function(resolve, reject) {
      fs.outputJson(db, ToDo.allToDos)
        .then(() => resolve(true))
        .catch(err => {
          reject(err);
        });
    });
  }

  addToDo() {
    ToDo.allToDos[this.id] = this;
    return new Promise(function(resolve, reject) {
      fs.outputJson(db, ToDo.allToDos)
        .then(() => resolve(true))
        .catch(err => {
          reject(err);
        });
    });
  }
}

ToDo.allToDos = {};

ToDo.loadAll = function(){
  return new Promise(function(resolve, reject) {
    fs.readJson(db)
      .then(packageObj => {
        ToDo.allToDos = packageObj;
        resolve(packageObj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = ToDo;
