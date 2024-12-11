const Hotel = require('../models/Hotel');

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new hotel
exports.addHotel = async (req, res) => {
  const { name, location, price } = req.body;
  
  const newHotel = new Hotel({ name, location, price });

  try {
    const hotel = await newHotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
