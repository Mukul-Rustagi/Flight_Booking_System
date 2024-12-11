// routes/flightRoutes.js

const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware'); // Correctly import the middleware
const router = express.Router();

// Example route to get all flights (protected route)
// router.get('/', protect, (req, res) => {
//   res.json({ message: 'List of flights' });
// });

// Admin-only route example
// router.post('/create', protect, isAdmin, (req, res) => {
//   res.json({ message: 'Flight created (admin only)' });
// });



router.post('/create', protect, isAdmin, (req, res) => {
    const { user } = req; // Access the logged-in user's info
  
    console.log(user); // Log the user info to ensure it's available
  
    // Add logic to create a new flight here
    // e.g. validate the request body for flight data, and save to the database
  
    res.json({ message: `Flight created by ${user.username} (admin only)` });
  });
  

  module.exports = router;

