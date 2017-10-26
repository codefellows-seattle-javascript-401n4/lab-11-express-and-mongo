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
          expect(res.status).toEqual();
        });
    });


  });


});
