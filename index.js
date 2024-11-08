const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const demoRoutes = require('./routes/Routes');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
const employeeController = require('./controllers/employeeController');

app.use(cors());
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

app.use(express.json());
// Use the demo routes
app.use('/api', employeeRoutes);
app.use('/api', demoRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
