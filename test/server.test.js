'use strict';

process.env.PORT = 4000;
const superagent = require('superagent');
const expect = require('expect');

describe('api/contact', function() {

  let noteID = '';

  beforeAll((done) => {
    require('../lib/_server').start();
    done();
  });
  afterAll((done) => {
    require('../lib/_server').stop();
    done();
  });


  describe('POST /api/contacts', () => {

    test('should respond with a 200', () => {

      return superagent.post('http://localhost:4000/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Fred Flintstone',
        profile: 'Stone Mover',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Fred Flintstone');
        expect(res.body.profile).toEqual('Stone Mover');
        noteID = res.body.id;
      });

    });

    test('should respond with a 200', () => {

      return superagent.post('http://localhost:4000/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Bob Barker',
        profile: 'Game Show Host',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('Bob Barker');
        expect(res.body.profile).toEqual('Game Show Host');
        noteID = res.body.id;
      });

    });

    it('should respond with a 400 and "Missing Name"', (done) => {

      superagent.post('http://localhost:4000/api/contacts')
      .set('Content-Type;', 'application/json')
      .send({
        profile: 'Some famous actress',
      })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Missing Name');
      });
      done();
    });

    it('should respond with a 400 and "Missing Profile"', (done) =>{

      superagent.post('http://localhost:4000/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Michael Jackson',
      })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Missing Profile');
      });
      done();
    });
  });


  describe('GET /api/contact', () => {

    test('should return a 404 for an unregistered route', (done) => {

      superagent.get('http://localhost:4000/api/goats')
      .then(res => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual('Page Does Not Exist');
      });
      done();
    });


    test('should return a 400 if no id is given', (done) => {

      superagent.get(`http://localhost:4000/api/contacts`)
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('Bad Request');
      });
      done();
    });

    test('should return a 404 for valid request w/id that is not found', (done) => {

      let badID = 'd61c3640-ba07-11e7-8981-41575cf111bp';
      superagent.get(`http://localhost:4000/api/contacts?id=${badID}`)
      .then(res => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual('Not Found');
      });
      done();
    });

    test('should return a 200 for a valid note id', (done) => {

      superagent.get(`http://localhost:4000/api/contact?=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
      done();
    });

  });

  describe('DELETE /api/contacts', () => {

    test('should respond with a 204 and delete the specified note', (done) => {

      superagent.post(`http://localhost:4000/api/contact?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(204);
        expect(res.message).toEqual('No Content');
      });
      done();
    });
  });

});
