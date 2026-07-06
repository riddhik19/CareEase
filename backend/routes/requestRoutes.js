const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');
const sendConfirmationEmail = require('../config/mailer');

router.post('/', protect, async (req, res) => {
  try {
    const { serviceName, description, price } = req.body;

    if (!serviceName || serviceName.trim() === '') {
      return res.status(400).json({ message: 'Service name is required' });
    }

    const newRequest = new ServiceRequest({
      serviceName,
      description,
      userName: req.user.name,
      price: price || 0,
    });

    const savedRequest = await newRequest.save();

    // look up user's email from database
    const user = await User.findById(req.user.id);

    if (user) {
      try{
        await sendConfirmationEmail({
        toEmail: user.email,
        userName: user.name,
        serviceName,
        price: price || 0,
      });
      }catch(emailError) {
    console.error('Email failed:', emailError.message);
  }
}

  res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;