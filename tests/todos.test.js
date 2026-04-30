const request = require('supertest');
const app = require('../src/app');

describe('GET /todos', () => {
  it('returns 200 with an array', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
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
