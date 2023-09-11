const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  name: String,
  countryId: mongoose.Schema.Types.ObjectId, // Reference to the country
  // Add other fields as needed
});

module.exports = mongoose.model('State', stateSchema);
