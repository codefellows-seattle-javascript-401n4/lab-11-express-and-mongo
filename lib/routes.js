const Note = require('./note.js');
const app = require('./server.js');
const bodyParser = require('body-parser').json();
const sendMessage = require('./message');

let notes = {Lul: 'xd'};
app.get('/api/notes/:id', (req, res) => {
        if(typeof notes[req.params.id] === 'undefined') {
          sendMessage(res, 404, 'Note not found');
        } else {
          sendMessage(res, 200, notes[req.params.id]);
        }
        res.end();
      });
      
app.get('/api/notes/', (req, res) => {
  sendMessage(res, 400, 'You did not send an id');
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  if (!id) sendMessage(res, 400, 'Please send a ?uuid= parameter with your POST request');
      console.log('DELETE', req.params.id);
      res.end()
  if (Object.keys(req.params.id).length > 0) {
    if (typeof notes[req.params.id] === 'undefined'){
      // 404 if note not found
    sendMessage(res, 404, 'Not not found.');
    } else {
      // 200 if note deleted
      delete notes[req.params.id];
      sendMessage(res, 200, 'Note deleted.');
    }
    
  } else {
    //404 id not found
    sendMessage(res, 404, 'Please send a ?uuid= parameter with your POST request')
  }
});

app.post('/api/notes', bodyParser, (req, res) => {
        if (req.body['body'] == '') {
                sendMessage(res, 400, 'Please submit content alongside body=');
        } else if (Object.keys(req.body).length === 0) {
                sendMessage(res, 400, 'Did not post a body in your request. Please submit as "body="');
        } else {
                let newNote = new Note(req.body['body']);
                notes[newNote.id] = newNote;
                sendMessage(res, 200, 'Note created');
        }
});

module.exports = app;
