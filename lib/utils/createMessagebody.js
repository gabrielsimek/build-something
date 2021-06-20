export default function createMessageBody(userName, items){
  const messageBody = items.reduce((accumulator, item) => {
    accumulator +=  `${item.item}: quantity ${item.quantity}, `;
    return accumulator;
  }, `Order received from user ${userName} for: \n`);
  return messageBody;
}
