'use strict';



const superagent = require('superagent');
const expect = require('expect');
process.env.PORT = 4000;



describe('api/contacts', function() {
  let noteID = '';

  beforeAll((done) => {
    require('../lib/_server').start(process.env.PORT);
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



    test('should respond with a 400 if name is not given', () => {
      return superagent.post('http://localhost:4000/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        profile: 'Some famous actress',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });



    test('should respond with a 400 if profile is not given', () =>{
      return superagent.post('http://localhost:4000/api/contacts')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Michael Jackson',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });



  describe('GET /api/contact', () => {
    test('should return a 404 for an unregistered route', () => {
      return superagent.get('http://localhost:4000/api/goats')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });



    test('should return a 400 if no id is given', () => {
      return superagent.get(`http://localhost:4000/api/contacts`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });



    test('should return a 404 for valid request w/id that is not found', () => {
      let badID = 'd61c3640-ba07-11e7-8981-41575cf111bp';
      return superagent.get(`http://localhost:4000/api/contacts?id=${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });



    test('should return a 200 for a valid note id', () => {
      return superagent.get(`http://localhost:4000/api/contacts?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });



  describe('DELETE /api/contacts', () => {
    test('should respond with a 204 and delete the specified note', () => {
      return superagent.delete(`http://localhost:4000/api/contacts?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
  });
});
