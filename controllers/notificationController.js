const User = require('../models/User'); // Assuming the User model is in the models directory
const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSMS = async (req, res) => {
  const { user, message } = req.body;

  // Validate required fields
  if (!user || !message) {
    return res.status(400).json({ message: 'User ID and message are required.' });
  }

  try {
    // Fetch the user's phone number from the database
    const userData = await User.findById(user);
    if (!userData || !userData.phoneNumber) {
      return res.status(404).json({ message: 'User or phone number not found.' });
    }

    const to = userData.phoneNumber;

    // Send the SMS
    client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    }).then((response) => {
      res.json({ success: true, message: 'SMS sent successfully', sid: response.sid });
    }).catch(err => {
      console.error('Twilio Error:', err);
      res.status(500).json({ message: 'Failed to send SMS', error: err.message });
    });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
