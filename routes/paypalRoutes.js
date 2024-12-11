const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController');

// Create payment via PayPal
router.post('/payment', paypalController.createPayment);

module.exports = router;
