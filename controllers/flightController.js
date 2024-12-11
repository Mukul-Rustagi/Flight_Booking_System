const Flight = require('../models/Flight');

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new flight
exports.addFlight = async (req, res) => {
  const { destination, departure, price } = req.body;
  
  const newFlight = new Flight({ destination, departure, price });

  try {
    const flight = await newFlight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
