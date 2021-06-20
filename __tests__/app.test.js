import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../models/Order.js';

describe('/api/v1/orders', () => {
  beforeEach(() => {
    return setup(pool);
  });
  const testOrder = {
    userName: 'Bob',
    items: [{ item: 'tooth-brush', quantity: 2 }, { item: 'tooth-paste', quantity: 5 }]
  };
  it('inserts an order into /api/v1/orders  ', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send(testOrder);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: expect.any(String), ...testOrder });
  });
  it('gets an order from /api/v1/orders:id  ', async () => {
    const order = await Order.insert(testOrder);
    const res = await request(app)
      .get(`/api/v1/orders/${order.id}`);
      
    expect(res.status).toBe(200);
    expect(res.body).toEqual(order);
  });
  it('gets all  orders from /api/v1/orders  ', async () => {
    const order1 = await Order.insert(testOrder);
    const order2 = await Order.insert({
      userName: 'Jason',
      items: [{ item: 'iphone', quantity: 1 }, { item: 'roomba', quantity: 1 }, { item: 'airpods', quantity: 1 }]
    });
    const res = await request(app)
      .get('/api/v1/orders');
      
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([order1, order2]));
  });
  it('updates the items in an order from /api/v1/orders:id  ', async () => {
     
    const order = await Order.insert(testOrder);
    const res = await request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send({ 
        userName: order.userName,
        items: [{ item: 'tooth-brush', quantity: 10 }] });

    order.items =  [{ item: 'tooth-brush', quantity: 10 }];
 
    expect(res.body).toEqual(order);
  });
  it('deletes an order from /api/v1/orders:id', async () => {
    const order = await Order.insert(testOrder);
   
    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .then(res => {
        expect(res.body).toEqual(order);
      });
  });
});
