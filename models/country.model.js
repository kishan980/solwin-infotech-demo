const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Country', countrySchema);
