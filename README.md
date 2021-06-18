### Build Something
# Orders data model and twilio on initial setup
# Build and test CRUD routes with orders Model and controller
# Implement twilio 
# Use some other API's


--orders come in as item, quantity, userName
    --maybe have another table with users that has addresses. Join order at userName
    --send text with order info and user info...

-- send multiple items per order 
``` js
{userName: 'bob',
orders: [
    {item: quantity}
    {item: quantity}
    //etc...
]
}```

Insert order Item ,quantity, userName
promise.All map each order in, attach userName