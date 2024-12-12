const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('./middleware/rateLimit');
const { sendSmsNotification } = require('./middleware/notification');
const sessionMiddleware = require('./middleware/sessionMiddleware')
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paypalRoutes = require('./routes/paypalRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Database Configuration (MongoDB)
const db = require('./config/db');
db();

// Redis Configuration for Rate Limiting (Optional, if you have rate limiting implemented via Redis)
const redis = require('./config/redis');

// PayPal Configuration (Optional, if you are integrating PayPal API)
const paypalConfig = require('./config/paypal');
const notification = require('./middleware/notification');
// Middleware setup

// 1. CORS Middleware
// Enable CORS for all domains (can be restricted later if needed)
app.use(cors({
  origin: '*', // Allow all domains for now (adjust as needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. JSON Body Parser Middleware
app.use(express.json()); // For parsing application/json

// 3. Rate Limiting Middleware
app.use(rateLimit);

// 4. SMS Notification Middleware (if using external SMS service like Twilio)
app.use(notification);

app.use(sessionMiddleware);

// Routes Setup
app.use('/api/auth', authRoutes);        // Authentication Routes
app.use('/api/flights', flightRoutes);   // Flight Routes
app.use('/api/hotels', hotelRoutes);     // Hotel Routes
app.use('/api/bookings', bookingRoutes); // Booking Routes
app.use('/api/paypal', paypalRoutes);    // PayPal Payment Routes
app.use('/api/notifications', notificationRoutes); // Notification Routes

// Serve static assets if in production (useful for frontend files in production)
// If you deploy your frontend to serve from the same backend server, you can serve the frontend assets.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
0



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
