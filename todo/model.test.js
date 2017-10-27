/*global jest, expect */
const ToDo = require('./model.js');
let fs = require('fs-extra');

//from John's lab-09 testing examples
let mockReadJson = (file) => {
  let json = {
    id:'id',
  };
  if ( file ) {
    return Promise.resolve(json);
  } else {
    return Promise.reject();
  }
};

let mockOutputJson = (file, json) => {
  if ( file && json ) {
    return Promise.resolve(true);
  } else {
    return Promise.reject();
  }
};

jest.spyOn(fs, 'outputJson').mockImplementation(mockOutputJson);
jest.spyOn(fs, 'readJson').mockImplementation(mockReadJson);

describe('to do constructor', function() {

  test('it creates a todo with a new id, date and title', () => {
    let todo = new ToDo({task: 'get stuff done'});
    expect(todo.task).toEqual('get stuff done');
  });

  describe('deleteToDo', () => {
    it('will delete an existing todo', () => {
      let newtodo = new ToDo({id: 'thisid', task : 'do more stuff'});
      ToDo.allToDos[newtodo.id] = newtodo;
      return newtodo.deleteToDo()
        .then(() => {
          expect(ToDo.allToDos[newtodo.id]).toBeNull;
        });
    });

  });
  describe('addToDo', () => {
    it('will andd a todo', () => {
      let newtodo = new ToDo({id: 'thisid', task : 'do more stuff'});
      return newtodo.addToDo()
        .then(() => {
          expect(ToDo.allToDos[newtodo.id].task).toEqual('do more stuff');
        });
    });
  });

  describe('loadAll', () => {
    it('will get all the todos in the file', () => {
      return ToDo.loadAll()
        .then(all => {
          expect(all.id).toEqual('id');
        });
    });
  });
});
