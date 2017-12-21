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



    test('should respond 400 if name not given', () => {
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



    test('should respond 400 if profile not given', () =>{
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
    test('should return 404 for unassigned route', () => {
      return superagent.get('http://localhost:4000/api/goats')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });



    test('should return 400 if no id', () => {
      return superagent.get(`http://localhost:4000/api/contacts`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });



    test('should return 404 for valid request with id', () => {
      let badID = 'd61c3640-ba07-11e7-8981-41575cf111bp';
      return superagent.get(`http://localhost:4000/api/contacts?id=${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });



    test('should return 200 for valid id', () => {
      return superagent.get(`http://localhost:4000/api/contacts?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });
  });



  describe('DELETE /api/contacts', () => {
    test('should respond 204 and delete specified note', () => {
      return superagent.delete(`http://localhost:4000/api/contacts?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
  });
});
