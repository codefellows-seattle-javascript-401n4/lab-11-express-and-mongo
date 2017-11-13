'use strict';

const Note = require('../lib/note.js');
const app = require('../lib/routes.js');
const request = require('superagent');
const expect = require('expect');
const server = app.listen(3000);

describe('Testing GET', () => {

  it('Send an error if note is not found', (done) => {
    request.get('localhost:3000/api/notes/123').end(function(err, res) {
      expect(res.text).toEqual('Note not found');
      done();
    });
  });
  it('Send note when correct id is presented', (done) => {
    request.get('localhost:3000/api/notes/Lul').end(function(err, res) {
      expect(res.text).toEqual('xd');
      done();
    });
  });
  it('Send error if you do not send an id', (done) => {
    request.get('localhost:3000/api/notes/').end(function(err, res) {
      expect(res.text).toEqual('You did not send an id');
      done();
    });
  });

});


describe('Testing POST', () => {
  after((done) => {
    server.close();
    done();
  });

  it('Create a note when body content is passed like body=content', (done) => {
    request.post('localhost:3000/api/notes', { body: 'hello' }, function(err, res) {
      expect(res.text).toEqual('Note created');
      done();
    });
  });

  it('Tell user to include body content if not provided', (done) => {
    request.post('localhost:3000/api/notes', { body: '' }, function(err, res) {
      expect(res.text).toEqual("Please submit content alongside body=");
      done();
    });
  });

  it('Tell user to post something if they did not', (done) => {
    request.post('localhost:3000/api/notes', {}, function(err, res) {
      expect(res.text).toEqual('Did not post a body in your request. Please submit as \"body=\"');
      done();
    });
  });

});