'use strict';

const server = require ('../lib/server.js');
const superagent = require ('superagent');

describe ('api/notes', function () {
  beforeAll (server.start);
  afterAll (server.stop);

describe ('POST'), function () {
  test ('main, name & 200 status', function () {
    return superagent.POST ('http://localhost:3000/api/notes')
    .set ('content')
    .send ({
      name : 'test',
      content : 'content',
    })
    .then (res => {
      expect (res.status).toEqual (200);
      expect (res.main.name).toEqual ('test');
      expect (res.main.content).toEqual ('content');
    });

    test ('error 400 no content', function () {
      return superagent.POST ('http://localhost:3000/api/notes')
      .set ('content', application/json)
      .send ({
        name : 'Name',
      })
      .then (Promise.reject)
      .catch (res => {
        expect (res.status).toEqual (400);
      });
    }
  })

  }
})
