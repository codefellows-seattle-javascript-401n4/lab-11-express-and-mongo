'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');
const expect = require('expect');

server.start();

describe('api/minions', function() {

//   describe('404 Test', () => {
//       it('should return 404', () => {
//           .send('fishsticks')
//           expect(res.status).toEqual(404);
//       })
//   })

  describe('POST', function(){
    it('should respond with a 200 status and minion Name and Rank', function(){
      return superagent.post('http://localhost:3000/api/minions')
        .set('content-type', 'application/json')
        .send({
          minionName: 'Josh',
          minionRank: 'Digger',
        })
        .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body.minionName).toEqual('Josh');
            expect(res.body.minionRank).toEqual('Digger');
        });
    });
    it('should respond with a 400 if no content was sent', function(){
      return superagent.post('http://localhost:3000/api/minions')
        .set('content-type', 'application/json')
        .send({
          minionName: 'Alister',
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('GET', function(){
    it('should respond with 200 when valid request made', function(){
      return superagent.get('http://localhost:3000/api/minions')
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
    it('should respond with 400 when incorrect ID sent', function(){
      return superagent.get('http://localhost:3000/api/minions?id=fishsticks')
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });
});

server.stop();