const todos = [];
let nextId = 1;

function getAll() {
  return todos;
}

function create(title) {
  const todo = { id: nextId++, title, completed: false };
  todos.push(todo);
  return todo;
}

module.exports = { getAll, create };
