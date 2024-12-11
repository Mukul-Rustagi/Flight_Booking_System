const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file

// Print the environment variables to debug
console.log(process.env.TWILIO_ACCOUNT_SID);  // Should print the SID
console.log(process.env.TWILIO_AUTH_TOKEN);   // Should print the Auth Token
console.log(process.env.TWILIO_PHONE_NUMBER); // Should print the Twilio phone number

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send SMS notification
exports.sendSMS = (req, res) => {
  const { to, message } = req.body;

  client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,  // The Twilio phone number
    to: to  // The recipient's phone number
  }).then((message) => {
    res.json({ success: true, message: 'SMS sent successfully', sid: message.sid });
  }).catch(err => {
    res.status(500).json({ message: err.message });
  });
};
