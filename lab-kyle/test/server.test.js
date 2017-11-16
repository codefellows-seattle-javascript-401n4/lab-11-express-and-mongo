'use strict';
/*global beforeAll, afterAll */

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

describe('express server', function() {

  beforeAll(() => server.listen(8080));

  describe('POST', function() {
    it('shold POST to api/coffee', function(){
      return superagent.post('http://localhost:8080/api/coffee')
        .send({'type': 'latte', 'origin': 'Ethiopia'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(req.body.type).toBe('latte');
          expect(req.body.origin).toBe('Ethiopia');
        });
    });
  });

  describe('GET', function() {
    it('should GET data from api/coffee', function() {
      return superagent.get('http://localhost:8080/api/coffee')
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
