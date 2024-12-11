const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware'); // Correctly import the middleware
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking (authenticated users only)
router.post('/', protect, bookingController.createBooking);

// // Admin-only route example (if any admin-specific functionality is needed)
router.post('/admin', protect, isAdmin, bookingController.createBooking); // Only admin can access this route

module.exports = router;
