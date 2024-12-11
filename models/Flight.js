const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema(
    {
  destination: 
  { 
    type: String, 
    required: true 
},
  departure: 
  { 
    type: String, 
    required: true 
},
  price: 
  { 
    type: Number, 
    required: true 
}
});

module.exports = mongoose.model('Flight', FlightSchema);
