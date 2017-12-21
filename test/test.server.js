'use strict';



process.env.PORT = 5500;
const superagent = require('superagent');
const expect = require('expect');



describe('api/notes', function() {
  let noteID = '';

  beforeAll((done) => {
    require('../lib/_server').start(process.env.PORT);
    done();
  });

  afterAll((done) => {
    require('../lib/_server').stop();
    done();
  });


  describe('POST /api/notes', () => {
    test('should respond with a 200', () => {
      return superagent.post('http://localhost:5500/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'WOW',
        content: 'Mystic Stuff',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('WOW');
        expect(res.body.content).toEqual('Mystic Stuff');
        noteID = res.body.id;
      });
    });


    test('should respond with a 200', () => {
      return superagent.post('http://localhost:5500/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'It',
        content: 'horror',
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('It');
        expect(res.body.content).toEqual('Very scary stuff');
        noteID = res.body.id;
      });
    });


    test('should respond with a 400 if no title', () => {
      return superagent.post('http://localhost:5500/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title: 'LOTR',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });


    test('should respond with a 400 if no content', () =>{
      return superagent.post('http://localhost:5500/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        content: 'Fantasy',
      })
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });


  describe('GET /api/notes', () => {
    test('should return a 404 for an unregistered route', () => {
      return superagent.get('http://localhost:5500/api/adobo')
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });


    test('should return a 400 if no id', () => {
      return superagent.get(`http://localhost:5500/api/notes`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });


    test('should return a 404 for valid request but no ID found', () => {
      let badID = 'dw1c7260-ba07-43f0-3333-12375wk109sg';
      return superagent.get(`http://localhost:5500/api/notes?id=${badID}`)
      .then(Promise.reject)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });


    test('should return a 200 for a valid note id', () => {
      return superagent.get(`http://localhost:5500/api/notes?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(200);
      });
    });

  });


  describe('DELETE /api/notes', () => {
    test('should respond with a 204 and delete note w/Id', () => {

      return superagent.delete(`http://localhost:5500/api/notes?id=${noteID}`)
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });
  });
});
