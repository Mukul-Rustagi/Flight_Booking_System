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
  const { totalAmount } = req.body;

  if (!totalAmount) {
    return res.status(400).json({ message: 'Total amount is required' });
  }

  const payment = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:5060/api/paypal/success',
      cancel_url: 'http://localhost:5060/api/paypal/cancel'
    },
    transactions: [{
      amount: { 
        total: totalAmount.toString(), // Ensure it's a string representing a number
        currency: 'USD' 
      },
      description: 'Travel booking payment'
    }]
  };

  paypal.payment.create(payment, function (error, paymentResponse) {
    if (error) {
      console.error('PayPal Error:', error);
      return res.status(500).json({
        message: 'Payment creation failed',
        details: error.response ? error.response.details : error
      });
    }

    // Find the approval URL for the user to approve the payment
    const approvalUrl = paymentResponse.links.find(link => link.rel === 'approval_url');
    if (approvalUrl) {
      res.json({
        approvalUrl: approvalUrl.href
      });
    } else {
      res.status(500).json({
        message: 'Approval URL not found in PayPal response',
        details: paymentResponse
      });
    }
  });
};
