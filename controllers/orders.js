import { Router } from 'express';
import Order from '../models/Order';

export default Router()
  .post('/', async (req, res, next) => {
    try {
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
  .delete('/:id', async (req, res, next) => {
    try {
      const deletedOrder = await Order.remove(req.params.id);
      res.send(deletedOrder);
      
    } catch (error) {
      next(error);
    }
  });
