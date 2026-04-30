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

function update(id, fields) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return null;
  if (fields.title !== undefined) todo.title = fields.title;
  if (fields.completed !== undefined) todo.completed = fields.completed;
  return todo;
}

module.exports = { getAll, create, update };
