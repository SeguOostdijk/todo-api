const { test, expect } = require('@playwright/test');

test.describe('TODO API',
  { tag: ['@critical', '@e2e', '@todos'] },
  () => {
    test('full CRUD flow',
      { tag: ['@TODOS-E2E-001'] },
      async ({ request }) => {
        // Crear tarea
        const created = await request.post('/todos', {
          data: { title: 'Aprender Playwright' },
        });
        expect(created.status()).toBe(201);
        const todo = await created.json();
        expect(todo.title).toBe('Aprender Playwright');
        expect(todo.completed).toBe(false);
        expect(todo.id).toBeDefined();

        // Verificar que aparece en la lista
        const list = await request.get('/todos');
        expect(list.status()).toBe(200);
        const todos = await list.json();
        expect(todos.some(t => t.id === todo.id)).toBe(true);

        // Actualizar
        const updated = await request.put(`/todos/${todo.id}`, {
          data: { title: 'Playwright dominado', completed: true },
        });
        expect(updated.status()).toBe(200);
        const updatedTodo = await updated.json();
        expect(updatedTodo.title).toBe('Playwright dominado');
        expect(updatedTodo.completed).toBe(true);

        // Eliminar
        const deleted = await request.delete(`/todos/${todo.id}`);
        expect(deleted.status()).toBe(204);

        // Verificar que ya no está
        const finalList = await request.get('/todos');
        const finalTodos = await finalList.json();
        expect(finalTodos.some(t => t.id === todo.id)).toBe(false);
      }
    );

    test('POST /todos returns 400 when title is missing',
      { tag: ['@TODOS-E2E-002'] },
      async ({ request }) => {
        const res = await request.post('/todos', { data: {} });
        expect(res.status()).toBe(400);
      }
    );

    test('PUT /todos/:id returns 404 for non-existent id',
      { tag: ['@TODOS-E2E-003'] },
      async ({ request }) => {
        const res = await request.put('/todos/9999', { data: { title: 'X' } });
        expect(res.status()).toBe(404);
      }
    );

    test('DELETE /todos/:id returns 404 for non-existent id',
      { tag: ['@TODOS-E2E-004'] },
      async ({ request }) => {
        const res = await request.delete('/todos/9999');
        expect(res.status()).toBe(404);
      }
    );
  }
);
