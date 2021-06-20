import AWS from 'aws-sdk';
const SES = AWS.SES;
import dotenv from 'dotenv';
dotenv.config();
// Set the region 

AWS.config.update({ region: 'us-east-2',
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY });

// AWS.config.getCredentials((err) => {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log('Access key:', AWS.config.credentials.accessKeyId);
//     console.log(AWS.config.region);
//   }
// });
// Create sendEmail params 
const params = {
  Destination: { /* required */
    CcAddresses: [
      'gabrielsimek@yahoo.com',
      /* more items */
    ],
    ToAddresses: [
      'gabrielsimek@yahoo.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
        Charset: 'UTF-8',
        Data: '<h1>Hello World</h1>'
      },
      Text: {
        Charset: 'UTF-8',
        Data: 'Hi There'
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
    }
  },
  Source: 'gabrielsimek@outlook.com', /* required */
  ReplyToAddresses: [
    'gabrielsimek@outlook.com',
    /* more items */
  ],
};

// Create the promise and SES service object
const sendPromise = new SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

// Handle promise's fulfilled/rejected states
sendPromise.then(
  (data) => {
    console.log(data.MessageId);
  }).catch(
  (err) => {
    console.error(err, err.stack);
  });
