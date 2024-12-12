const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  membership: { type: String, enum: ['6 months', '1 year', '2 years'], default: '6 months' },
});

module.exports = mongoose.model('Vendor', vendorSchema);