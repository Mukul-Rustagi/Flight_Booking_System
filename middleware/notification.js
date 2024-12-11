const { sendSMS } = require('../controllers/notificationController');

// Send SMS notification after every booking
module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.originalUrl === '/api/bookings') {
    const userPhoneNumber = req.body.userPhoneNumber;  // Assuming the phone number is passed in the request body
    const message = `Booking successful! Your booking for the flight and hotel has been confirmed.`;

    sendSMS({ to: userPhoneNumber, message })
      .then(() => next())
      .catch((err) => res.status(500).json({ message: 'Error in sending notification' }));
  } else {
    next(); // Continue if not a booking route
  }
};
