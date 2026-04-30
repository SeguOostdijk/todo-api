const express = require('express');
const app = express();
const todosRouter = require('./routes/todos');

app.use(express.json());
app.use('/todos', todosRouter);

module.exports = app;
