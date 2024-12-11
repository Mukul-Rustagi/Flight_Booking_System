const paypal = require('paypal-rest-sdk');
const dotenv = require('dotenv');
dotenv.config();

paypal.configure({
  mode: 'sandbox', // 'sandbox' or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// PayPal payment
exports.createPayment = (req, res) => {
  const payment = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:5000/api/paypal/success',
      cancel_url: 'http://localhost:5000/api/paypal/cancel'
    },
    transactions: [{
      amount: { total: req.body.totalAmount, currency: 'USD' },
      description: 'Travel booking payment'
    }]
  };

  paypal.payment.create(payment, function (error, payment) {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Payment creation failed' });
    } else {
      res.json(payment);
    }
  });
};
