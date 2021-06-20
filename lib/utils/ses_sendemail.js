import AWS from 'aws-sdk';
const SES = AWS.SES;
import dotenv from 'dotenv';
dotenv.config();
// Set the region 

AWS.config.update({ region: 'us-east-2',
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY });


export default async  function sendEmail(toEmail, fromEmail, subject, message){
  const params = {
    Destination: { /* required */
      CcAddresses: [
        toEmail,
        /* more items */
      ],
      ToAddresses: [
        toEmail,
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: 'UTF-8',
          Data: `<p>${message}</p>`
        },
        Text: {
          Charset: 'UTF-8',
          Data: ''
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromEmail, /* required */
    ReplyToAddresses: [
      fromEmail,
      /* more items */
    ],
  };
      
  // Create the promise and SES service object
  const sendPromise = new SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
      
  // Handle promise's fulfilled/rejected states
  try {
    const data = await sendPromise;
    console.log(data);
  } catch (err) {
    console.error(err, err.stack);
  }
}


// AWS.config.getCredentials((err) => {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log('Access key:', AWS.config.credentials.accessKeyId);
//     console.log(AWS.config.region);
//   }
// });
// Create sendEmail params 
