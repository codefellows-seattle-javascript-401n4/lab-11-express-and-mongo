'use strict';

process.env.PORT = 5500;
const server = require('../server');
const superagent = require('superagent');
const expect = require('expect');

// describe('api/notes lab', () => {

//   beforeAll(() => {
//     return server.start(process.env.PORT);
//   });

//   afterAll(() => {
//     return server.stop();
//   });

  describe ('POST /api/notes', () => {

    it('should respond with a 200', (done) => {
        superagent.post('http://localhost:5500/api/notes')
        .set('Content-Type', 'application/json')
        .send({
          title:'hello world',
          content: 'this is my first note'
        })
        .end((err, res) => {
            if(err) return done(err);
        // .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('hello world');
          expect(res.body.content).toEqual('this is my first note');
          done();
        });
    });

    it('should return 404', function(done) {
         superagent.post('http://localhost:5500/api/notes')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
      });
    });
// });