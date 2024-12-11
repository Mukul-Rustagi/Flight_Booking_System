const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 

  },
  hotel: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hotel', required: true 
},
  flight: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Flight', required: true 
},
  totalAmount: { 
    type: Number, 
    required: true    
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
