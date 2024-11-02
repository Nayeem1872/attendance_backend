const mongoose = require('mongoose');

// Define the employee schema
const employeeSchema = new mongoose.Schema({
    name: String,
    macAddress: String,
    status: { type: String, default: 'inactive' },
    lastSeen: Date
});

// Export the model
module.exports = mongoose.model('Employee', employeeSchema);