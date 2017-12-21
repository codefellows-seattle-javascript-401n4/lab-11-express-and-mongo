'use strict';

const Note = require ('../note/note.js')
const Router = require ('express')
const jsonParser = require ('body-parser')

let noteRouter = module.exports = new Router()

noteRouter.post ('/api/notes', jsonParser, (req, res, next) => {
  console.log ('/api/notes')

  req.main.created = new Date ()

  new Note (req.body)
  .save ()
  .then (note => res.json(note))
  .catch (next)
})

noteRouter.get ('api/notes/id', (req, res, next) => {
  console.log ('/api/notes/id')

  Note.findById (req.params.id)
  .then (note => res.json (note))
  .catch (next)
});
