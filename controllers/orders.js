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
  });
