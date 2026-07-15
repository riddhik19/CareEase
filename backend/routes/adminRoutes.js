const express = require('express');
const router = express.Router();
const adminOnly = require('../middleware/adminMiddleware');
const ServiceRequest = require('../models/ServiceRequest');

// GET /api/admin/requests — get all requests
router.get('/requests', adminOnly, async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PATCH /api/admin/requests/:id — update status
router.patch('/requests/:id', adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['Pending', 'Accepted', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;