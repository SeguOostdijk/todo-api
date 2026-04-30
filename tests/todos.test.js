const request = require('supertest');
const app = require('../src/app');

describe('GET /todos', () => {
  it('returns 200 with an array', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
