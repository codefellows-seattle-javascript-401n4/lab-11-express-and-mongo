/* global beforeAll, afterAll, expect */

'use strict';

const superagent = require('superagent');
const server = require(__dirname + '/../lib/server.js');


describe('my express server', () => {
  beforeAll( () => server.listen(3000));
  afterAll( () => server.close());

  describe('POST /api/notes', () => {
    test('should respond with body content that was given', () => {
      return superagent.post('http://localhost:3000/api/notes')
        .send({'name':'gandalf','wizard':'heck ya'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toBe('gandalf');
          expect(res.body.wizard).toBe('heck ya');
        });
    });
    test('should respond with status 400 if improper JSON is receieved', () => {
      return superagent.post('http://localhost:3000/api/notes')
        .send({'derp':'halp'})
        .then(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('GET /api/notes', () => {
    test('should respond with 200 and the corresponding note', () => {
      return superagent.get('http://localhost:3000/api/notes')
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    test('should respond with 404 if ID given does not exist', () => {
      return superagent.get('http://localhost:3000/api/notes?id=59f260eb88057f1d73f1b143')
        .then(res => {
          expect(res.status).toEqual(404);
        });
    });
  }); 


});
