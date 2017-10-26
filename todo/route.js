const express = require('express');
const ToDo = require('../todo/model.js');
const jsonParser = require('body-parser').json();

const app = express();
const PORT = process.env.PORT || 2000;

app.post('/api/todos', jsonParser, (req, res) => {
  let newpost = new ToDo(req.body);
  newpost.addToDo();
  res.send(`success ${JSON.stringify(newpost)}`);
});

app.get('/api/todos', (req, res) => {
  if (req.query.id) {
    if (ToDo.allToDos[req.query.id]) {
      return res.send();
    }
    throw {mess: 'not found', status: 404}
  }
  let sendBody = ToDo.allToDos;
  if (sendBody) {
    res.send(sendBody);
  } else {
    throw {mess: 'good god something has gone really wrong', status: 404}
  }
});

app.delete('/api/todos', (req, res) => {
  //check id
  if (req.query.id) {
    let id = req.query.id;
    let todo = ToDo.allToDos[id];
    if (todo) {
      let toDelete = new ToDo(Object.assign({}, todo))
      toDelete.deleteToDo().then(() => {
        res.send('deleted!')
      });
    } else {
      throw {mess: 'not found', status: 404}
    }
  }
});

app.use('/api/todos', (err, req, res, next) => {
  if (err) {
    console.log(err);
    let status = err.status || 400;
    let message = err.mess || 'oh no server error';
    return res.status(status).send(message);
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  }
);
