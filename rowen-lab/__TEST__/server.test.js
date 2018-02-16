'use strict';

proces.env.PORT = 4000;
const superagent = require('superagent');
const expect = require('expect');

describe('api/contacts', ()=>{
  let pokeID = ''
  beforeAll((done)=> {
    require('../lib/_server').start(process.env.PORT);
    done();
  });
  afterAll((done)=>{
    require('../lib/_server').stop();
    done();
  });

  describe('POST /api/pokemon', () => {
    test('should respond with 200 err', ()=>{
      return superagent.post('https://localhost:4000/api/pokemon')
        .set('Content-Type', 'apllication/json')
        .send({
          name: 'Garchomp',
          stats: {
            health: 100,
            def: 150,
            att: 100,
          },
        })
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
