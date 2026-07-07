const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const protect = require('../middleware/authMiddleware');
const ServiceRequest = require('../models/ServiceRequest');
const User = require('../models/User');
const sendConfirmationEmail = require('../config/mailer');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// POST /api/payment/verify
router.post('/verify', protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      serviceName,
      description,
      price,
    } = req.body;

    // verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // payment is valid — save request
    const newRequest = new ServiceRequest({
      serviceName,
      description,
      userName: req.user.name,
      price,
      paymentId: razorpay_payment_id,
      paymentStatus: 'Paid',
    });

    await newRequest.save();

    // send confirmation email
    const user = await User.findById(req.user.id);
    if (user) {
      try {
        await sendConfirmationEmail({
          toEmail: user.email,
          userName: user.name,
          serviceName,
          price,
        });
      } catch (emailError) {
        console.error('Email failed:', emailError.message);
      }
    }

    res.status(201).json({ message: 'Payment verified and request saved', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;