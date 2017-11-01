'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');
const expect =require('expect');

describe('my express server', () => {
  beforeAll( () => server.listen(5555));


  describe('POST /api/cats', () => {
    test('we should get a car named Whiskers whos fav toy is a penny', () => {
      return superagent.post('http://localhost:5555/api/cats')
      .send({'name':'Whiskers','favToy':'penny on wooden floor'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toBe('Whiskers');
        expect(res.body.favToy).toBe('penny on wooden floor');
      });
    });
    test('should respond with status 400 if improper JSON is receieved', () => {
      return superagent.post('http://localhost:5555/api/cats')
      .send({'bad':'json'})
      .then(res => {
        expect(res).toEqual('Bad Request');
      });
    });
  });
  describe('GET /api/cats', () => {
    test('should get all cats and provide a statusCode of 200', () => {
      return superagent.get('http://localhost:5555/api/cats')
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
    test('should respond with 404 if ID given does not exist', () => {
      return superagent.get('http://localhost:5555/api/cats?id=bleh')
      .then(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
