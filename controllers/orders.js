import { Router } from 'express';
import Order from '../models/Order';
import sendText from '../lib/utils/twilio.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const message = await sendText(process.env.ORDER_HANDLER_NUMBER, process.env.TWILIO_NUMBER, 'Hello');
      console.log('orders.js', message)
      
      ;
      const order = await Order.insert(req.body);
      res.send(order);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      res.send(order);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const order = await Order.findAll();
      res.send(order);
    } catch (error) {
      next(error);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const updatedOrder = await Order.update(req.body, req.params.id);
      res.send(updatedOrder);
      
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', (req, res, next) => {
    Order.remove(req.params.id)
      .then(order => res.send(order))
      .catch(error => next(error));
  });
