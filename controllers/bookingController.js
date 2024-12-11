const Booking = require('../models/Booking');

// Create booking
exports.createBooking = async (req, res) => {
  const { user, hotel, flight, totalAmount } = req.body;

  const newBooking = new Booking({ user, hotel, flight, totalAmount });

  try {
    const booking = await newBooking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
