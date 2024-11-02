
const mongoose = require('mongoose');

// Define a simple schema and model
const demoSchema = new mongoose.Schema({
  message: String
});

const Demo = mongoose.model('Demo', demoSchema);

module.exports = Demo;
