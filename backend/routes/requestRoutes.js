const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');

router.post('/', async (req, res) => {
  try {
    const { serviceName, description, userName } = req.body;

    if (!serviceName || serviceName.trim()==="") {
      return res.status(400).json({ message: 'Service name is required' });
    }

    const newRequest = new ServiceRequest({
      serviceName,
      description,
      userName,
    });

    const savedRequest = await newRequest.save();

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