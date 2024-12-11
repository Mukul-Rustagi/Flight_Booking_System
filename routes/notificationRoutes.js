const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Send SMS notification
router.post('/send', notificationController.sendSMS);

module.exports = router;
