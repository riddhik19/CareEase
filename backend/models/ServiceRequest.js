const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema(
  {
    userName: {
        type: String,
        default: "guest"
    },
    serviceName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;