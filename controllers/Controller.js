// controllers/demoController.js
const Demo = require('../models/Model');

// Function to seed the database
async function seedDatabase() {
  const count = await Demo.countDocuments();
  if (count === 0) { // Seed only if the collection is empty
    const demoDoc = new Demo({ message: 'Hello, MongoDB!' });
    await demoDoc.save();
    console.log('Sample document added to database');
  } else {
    console.log('Database already seeded.');
  }
}

// Function to get the demo message
async function getDemoMessage(req, res) {
  try {
    const demoDoc = await Demo.findOne();
    if (demoDoc) {
      res.json({ message: demoDoc.message });
    } else {
      res.status(404).json({ error: 'No message found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving message' });
  }
}

// Export functions
module.exports = {
  seedDatabase,
  getDemoMessage
};
