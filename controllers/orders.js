import { Router } from 'express';
import Order from '../models/Order';
// import sendText from '../lib/utils/twilio.js';
import OrderService from '../services.js/OrderService';
export default Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body, req.method);
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
      
      const updatedOrder = await OrderService.update(req.body, req.params.id, req.method);
      res.send(updatedOrder);
      
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', (req, res, next) => {
    OrderService.cancel(req.params.id, req.method)
      .then(order => res.send(order))
      .catch(error => next(error));
  });
