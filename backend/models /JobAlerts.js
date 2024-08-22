const mongoose = require('mongoose');

const jobAlertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const JobAlert = mongoose.model('JobAlert', jobAlertSchema);
module.exports = JobAlert;
