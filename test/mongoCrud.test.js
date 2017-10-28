/*global beforeAll, afterAll, expect*/
'use strict';

const server = require('../expressMongodbServer');
const superagent = require('superagent'); //a client

describe('api/notes', function() {

  describe('POST /api/notes', () => {
    test('should respond with the body content for a post request with a valid body', () => {
      return superagent.post('http://localhost:3000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Bamboo Garden',
        type: 'Asian',
        location: 'Seattle Center',
      })
      .then( res => {
        //console.log(`res.body: `, res.body);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Bamboo Garden');
        expect(res.body.type).toEqual('Asian');
        expect(res.body.location).toEqual('Seattle Center');
      });
    });

    test('should respond with "bad request" if no body was provided or the body was invalid', () => {
      return superagent.post('http://localhost:3000/api/notes')
      .set('Content-Type', 'application/json')
      .send('Bad JSON')
      //if superagent throw an error or bad request then .catch would catch the error
      .catch( res => {
        expect(res.status).toEqual(400);
      });
    });
  });


//post a note first then get the provided id and replaced the id below
  describe('GET /api/notes', () => {
    test('should respond with a 200, containing a response body for a request made with a valid id', () => {
      return superagent.get('http://localhost:3000/api/notes?id=59f430026148104822e53375')
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(1);
      });
    });

    test('should respond with a 400, "bad request" if no id was provided in the request', () => {
      return superagent.get('http://localhost:3000/api/notes')
      .catch( res => {
        expect(res.status).toEqual(400);
      });
    });

    test('should respond with a 404, "not found" for valid requests but no matching id', () => {
      //I changed the last digit 8 into 7, creating a no matching id scenario
      return superagent.get('http://localhost:3000/api/notes?id=59f188e5a6bd55d40529b837')
      .catch( res => {
        expect(res.status).toEqual(404);
      });
    });
  });


});
