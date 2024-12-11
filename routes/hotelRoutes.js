const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware'); // Use isAdmin instead of authorizeRoles
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Get all hotels (protected route)
router.get('/', protect, hotelController.getAllHotels);

// Add a new hotel (admin only)
router.post('/', protect, isAdmin, hotelController.addHotel);

module.exports = router;
