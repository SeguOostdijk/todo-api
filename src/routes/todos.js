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

module.exports = router;
