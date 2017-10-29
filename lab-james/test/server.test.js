'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');

describe('api/notes', function() {

  beforeAll(server.start);
  afterAll(server.stop);

  describe('POST', function(){

    test('should respond with a 200 status and name and body', function(){
      return superagent.post('http://localhost:3000/api/notes')
        .set('content-type', 'application/json')
        .send({
          name: 'Note test',
          content: 'content',
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Note test');
          expect(res.body.content).toEqual('content');
        });
    });

    test('should respond with a 400 if no content was sent', function(){
      return superagent.post('http://localhost:3000/api/notes')
        .set('content-type', 'application/json')
        .send({
          name: 'Name',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

  });

  describe('GET', function(){

    test('should respond with 200 when valid request made', function(){
      return superagent.get('http://localhost:3000/api/notes')
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    test('should respond with 400 when incorrect ID sent', function(){
      return superagent.get('http://localhost:3000/api/notes?id=5')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

  });

});
