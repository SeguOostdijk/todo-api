const express = require('express');
const router = express.Router();
const store = require('../todos');

router.get('/', (req, res) => {
  res.json(store.getAll());
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }
  const todo = store.create(title);
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = store.update(id, req.body);
  if (!todo) return res.status(404).json({ error: 'todo not found' });
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = store.remove(id);
  if (!deleted) return res.status(404).json({ error: 'todo not found' });
  res.status(204).send();
});

module.exports = router;
