export default function createMessageBody(userName, items, method){
  const adjective = method === 'POST' ? 'received from ' 
    : method === 'PUT' ? 'updated by '
      : method === 'DELETE' ? 'cancelled by '
        : '';
  
  const messageBody = items.reduce((accumulator, item) => {
    accumulator +=  `${item.item}: quantity ${item.quantity}, `;
    return accumulator;
  }, `Order ${adjective} user ${userName} for: \n`);
  return messageBody;
}
