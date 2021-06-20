import Order from '../models/Order';
import sendSms from '../lib/utils/twilio.js';
import createMessageBody from '../lib/utils/createMessagebody';
export default class OrderService {
  static async create(order, method){
    const newOrder = await Order.insert(order);

    const messageBody = createMessageBody(order.userName, order.items, method);
    
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      process.env.TWILIO_NUMBER,
      messageBody
    );
    return newOrder;
  }

  static async update(order, id, method){
    const updatedOrder = await Order.update(order.items, id);

    const messageBody = createMessageBody(order.userName, order.items, method);

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      process.env.TWILIO_NUMBER,
      messageBody
    );
    
    return updatedOrder;
  }

  static async cancel(id, method){
    const deletedOrder = await Order.remove(id);

    const messageBody = createMessageBody(deletedOrder.userName, deletedOrder.items, method);

    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      process.env.TWILIO_NUMBER,
      messageBody
    );
    return deletedOrder;
  }
}
