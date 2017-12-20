'use strict';



process.env.PORT = 4000;
const superagent = require('superagent');
const expect = require('expect');



describe('api/contacts', function() {

  let nodeID = '';

  beforeAll((done) => {
    require('../lib/_server').start(process.env.PORT);
    done();
  });

  afterAll((done) => {
    require('../lib/))_server').stop();
    done();
  });



describe('POST /api/contacts', () => {
  test('should respond with a 200', () => {
    return superagent.post(`http://localhost:4000/api/contacts`)
    .set('Content-Type', 'application/json')
    .send({
      name: '',
      profile: '',
    })
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.name).toEqual('');
      expect(res.body.profile).toEqual('');
      noteID = res.body.id;
    });
  });



  test('should respond with 400 if name not provided', () => {
    return superagent.post(`http://localhost:4000/api/contacts`)
    .set('Content-Type', 'application/json')
    .send({
      profile: '',
    })
    .then(Promise.reject)
    .catch(res => {
      expect(res.status).toEqual(400);
    });
  });



  test('should respond with a 400 if profile is not given', () => {
    return superagent.post(`http://localhost:4000/api/contacts`)
    .set('Content-Type', 'application/json')
    .send({
      name: '',
    })
    .then(Promise.reject)
    .catch(res => {
      expect(res.status).toEqual(400);
    });
  });
});



describe('GET /api/contact', () => {
  test('should return a 404 for wrong route', () => {
    return superagent.get(`http://localhost:4000/api/numners`)
    .then(Promise.reject)
    .catch(res => {
      expect(res.status).toEqual(404);
    });
  });



  test('should return a 400 if no id', () => {
    return superagent.get(`http://localhost:4000/api/contacts`)
    .then(Promise.reject)
    .catch(res => {
      expect(res.status).toEqual(400);
    });
  });



  test('should return a 404 if no id', () => {
    let badID = 'jfjkhdf838373';
    return superagent.get(`http://localhost:4000/api/contacts?id=${id}`)
    .then(Promise.reject)
    .catch(res => {
      expect(res.status).toEqual(404);
    });
  });



  test('should return a 200 for a working id', () => {
    return superagent.get(`http://localhost:4000/api/contacts?id=${noteID}`)
    .then(res => {
      expect(res.status).toEqual(200);
    });
  });
});



describe('DELETE /api/contacts', () => {
  test('should return a 204 and delete', () => {
    return superagent.delete(`http://localhost:4000/api/contacts?id=${noteID}`)
    .then(res => {
      expect(res.status).toEqual(204);
    });
  });
});




});
