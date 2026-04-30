const request = require('supertest');
const app = require('../src/app');

describe('GET /todos', () => {
  it('returns 200 with an array', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('DELETE /todos/:id', () => {
  it('deletes a todo and returns 204', async () => {
    const created = await request(app).post('/todos').send({ title: 'To delete' });
    const id = created.body.id;

    const res = await request(app).delete(`/todos/${id}`);
    expect(res.status).toBe(204);
  });

  it('returns 404 for non-existent id', async () => {
    const res = await request(app).delete('/todos/9999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /todos/:id', () => {
  it('updates title and completed', async () => {
    const created = await request(app).post('/todos').send({ title: 'Original' });
    const id = created.body.id;

    const res = await request(app).put(`/todos/${id}`).send({ title: 'Updated', completed: true });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated');
    expect(res.body.completed).toBe(true);
  });

  it('returns 404 for non-existent id', async () => {
    const res = await request(app).put('/todos/9999').send({ title: 'X' });
    expect(res.status).toBe(404);
  });
});

describe('POST /todos', () => {
  it('creates a todo and returns 201', async () => {
    const res = await request(app).post('/todos').send({ title: 'Aprender GitHub Actions' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Aprender GitHub Actions');
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  it('returns 400 if title is missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.status).toBe(400);
  });
});
