/*global expect*/

const route = require('./route');

let Res = function(){};

Res.prototype.status = function(status) {
  this.code = status;
  return this;
};

Res.prototype.send = function(body) {
  this.body = body;
  return this;
};

let res = new Res();

describe('To Do routes', () => {
  describe('get', () => {
    it('gets all the todos if no id passed', () => {
      let req = {};
      req.query = {};
      req.body = {};
      let test = route.get(req, res);
      expect(typeof test).toEqual('object');
    });

    it('throws an 404 if the todo is not found', () => {
      let expectError = () => {
        let req = {};
        req.query = {};
        req.body = {};
        req.query.id = 'id';
        route.get(req, res);
      };
      expect(expectError).toThrow('not found');
    });
  });

  describe('post', () => {
    it('returns 200 if body sent', () => {
      let req = {};
      req.query = {};
      req.body = {};
      req.body.task = 'do something else';
      let test = route.post(req, res);
      expect(test.code).toEqual(200);
    });
    it('returns 400 if no task', () => {
      let expectError = () => {
        let req = {};
        req.query = {};
        req.body = {};
        req.body.task = null;
        route.post(req, res);
      };
      expect(expectError).toThrow('need a task to do');
    });
  });

  describe('delete', () => {

    it('throws an 404 if the todo is not found', () => {
      let expectError = () => {
        let req = {};
        req.query = {};
        req.body = {};
        req.query.id = 'id';
        route.delete(req, res);
      };
      expect(expectError).toThrow('not found');
    });
  });
});
