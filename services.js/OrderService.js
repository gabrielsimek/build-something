import Order from '../models/Order';
import sendSms from '../lib/utils/twilio.js';
import createMessageBody from '../lib/utils/createMessagebody';
import sendEmail from '../lib/utils/ses_sendemail';
export default class OrderService {
  static async create(order, method){
    const newOrder = await Order.insert(order);

    const messageBody = createMessageBody(order.userName, order.items, method);
    
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      process.env.TWILIO_NUMBER,
      messageBody
    );

    await sendEmail(
      process.env.ORDER_HANDLER_EMAIL,
      process.env.AWS_SES_EMAIL,
      messageBody.split(' ').slice(0, 2).join(' '),
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

    await sendEmail(
      process.env.ORDER_HANDLER_EMAIL,
      process.env.AWS_SES_EMAIL,
      messageBody.split(' ').slice(0, 2).join(' '),
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
    
    await sendEmail(
      process.env.ORDER_HANDLER_EMAIL,
      process.env.AWS_SES_EMAIL,
      messageBody.split(' ').slice(0, 2).join(' '),
      messageBody
    );

    return deletedOrder;
  }
}
