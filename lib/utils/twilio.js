import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
//start and test run dotenv config inside script!
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
export default function sendText(to, from, message) {
  return twilioClient.messages.create({
    body: message,
    from,
    to
  });
}

sendText(process.env.ORDER_HANDLER_NUMBER, process.env.TWILIO_NUMBER, 'Hello').then(message => console.log('twilio.js', message)).catch(err => console.error(err));
