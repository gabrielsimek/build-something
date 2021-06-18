import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('/api/v1/orders', () => {
  beforeEach(() => {
    return setup(pool);
  });
  const order = {
    userName: 'Bob',
    items: [{ item: 'tooth-brush', quantity: 2 }, { item: 'tooth-paste', quantity: 5 }]
  };
  it('inserts an order into /api/v1/orders  ', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send(order);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: expect.any(String), ...order });
  });
});
