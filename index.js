const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const demoRoutes = require('./routes/Routes');
const employeeRoutes = require('./routes/employeeRoutes');
const employeeController = require('./controllers/employeeController');

dotenv.config({ path: './.env' });
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    employeeController.seedDatabase(); 

    require('./controllers/Controller').seedDatabase(); 
  })
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Use the demo routes
app.use('/api', employeeRoutes);
app.use('/api', demoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
