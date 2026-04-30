const express = require('express');
const router = express.Router();
const store = require('../todos');

router.get('/', (req, res) => {
  res.json(store.getAll());
});

module.exports = router;
