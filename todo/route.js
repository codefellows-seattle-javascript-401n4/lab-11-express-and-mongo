const express = require('express');
const ToDo = require('../todo/model.js');
const jsonParser = require('body-parser').json();

const app = express();
const PORT = process.env.PORT || 5000;

app.post('/api/todos', jsonParser, (req, res) => {
  console.log('post', req.body);
  let newpost = new ToDo(req.body);
  newpost.addToDo();
  res.send('success');
});

app.get('/api/todos', (req, res) => {
  let isIdQuery = req.url && req.url.query && req.url.query.id ? true: false;
  if (isIdQuery) {
    return res.send(ToDo.allToDos[req.url.query.id]);
  }
  let sendBody = ToDo.allToDos;
  if (sendBody) {
    res.send(sendBody);
  } else {
    status = 404;
    res.status(404).send('no notes! this is pretty terrible');
  }
});

app.delete('/api/todos', (req, res) => {
  //check id
  console.log('get');
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
}
);
