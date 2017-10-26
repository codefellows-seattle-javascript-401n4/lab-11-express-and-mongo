const express = require('express');
const ToDo = require('../todo/model.js');
const jsonParser = require('body-parser').json();

const app = express();
const PORT = process.env.PORT || 5000;

app.post('/api/todos', jsonParser, (req, res) => {
  let newpost = new ToDo(req.body);
  newpost.addToDo();
  res.send(`success ${JSON.stringify(newpost)}`);
});

app.get('/api/todos', (req, res) => {
  if (req.query.id) {
    return res.send(ToDo.allToDos[req.query.id]);
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
  if (req.query.id) {
    console.log(req.query.id);
    let id = req.query.id;
    let todo = ToDo.allToDos[id];
    if (todo) {
      let toDelete = new ToDo(Object.assign({}, todo))
      toDelete.deleteToDo().then(() => {
        res.send('deleted!')
      });
    } else {
      res.status(404).send('that todo doesnt exsist')
    }
  }
});

app.use('/api/todos', jsonParser, (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.status(400).send('server error');
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
}
);
