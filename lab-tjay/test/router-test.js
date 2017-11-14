'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempMinion;

describe('testing all the routes! :', () => {

  before(server.start);
  after(server.stop);

  describe('testing the POST of api/minions/ :', () => {

    it('Should return a Fresh Minion', () => {
      return superagent.post(`${API_URL}/api/minions`)
        .send({jobTitle: 'Minion Digger', minionRank: 'Minion First Class', minionAge: '30'})
        .catch(res => {
          expect(res.status).toEqual(400);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.jobTitle).toEqual('Minion Digger');
          expect(res.body.minionRank).toEqual('Minion First Class');
          expect(res.body.minionAge).toEqual('30');
          expect(res.body._id).toExist();
          tempMinion = res.body;
          console.log(tempMinion);
        });
    });



    it('Should Kick out a 400 ERROR', () => {
      return superagent.post(`${API_URL}/api/minions`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing the GET by ID of api/minions/ :', () => {
    it('should respond with a registered Minion', () => {
      return superagent.get(`${API_URL}/api/minions/${tempMinion._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.jobTitle).toEqual(tempMinion.jobTitle);
          expect(res.body.minionRank).toEqual(tempMinion.minionRank);
          expect(res.body.minionAge).toEqual(tempMinion.minionAge);
          expect(res.body.created).toExist();
        });
    });
  });

  describe('testing the PUT method of api/minions/ :', () => {
    it('should update a minions record by ID', () => {
      return superagent.put(`${API_URL}/api/minions/${tempMinion._id}`)
        .send({jobTitle: 'Minion Tunneler', minionRank: 'Minion Second Class', minionAge: '25'})
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.jobTitle).toEqual('Minion Tunneler');
          expect(res.body.minionRank).toEqual('Minion Second Class');
          expect(res.body.minionAge).toEqual('25');
        });
    });
  });

  describe('testing how to fire minions using DELETE by ID', () =>{
    it('Should Send a Minion Packing - Code 200', () => {
      return superagent.delete(`${API_URL}/api/minions/${tempMinion._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body).toEqual({});
          expect(res.body.jobTitle).toEqual(undefined);
          expect(res.body.minionRank).toEqual(undefined);
          expect(res.body.MinionAge).toEqual(undefined);
        });
    });
  });


  describe('404 is a thing :', () => {
    it('should return a 404 status', () => {
      return superagent.post(`${API_URL}/potatos`)
        .send({iLike: 'potatos'})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

});
