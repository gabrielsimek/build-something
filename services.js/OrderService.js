import Order from '../models/Order';
import sendSms from '../lib/utils/twilio.js';
import createMessageBody from '../lib/utils/createMessagebody';
export default class OrderService {
  static async create({ userName, items }){
    const messageBody = createMessageBody(userName, items);
    const order = await Order.insert(userName, items);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      process.env.TWILIO_NUMBER,
      messageBody
    );
    return order;
  }
}
