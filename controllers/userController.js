
const bcrypt = require('bcrypt');
const UsersModel = require('../models/UsersModel');


const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    console.log("Received signup request with data:", { email, password, username });

    // Check if the user already exists
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      console.log("User with email already exists:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create and save the new user
    const user = new UsersModel({ email, password: hashedPassword, username });
    await user.save();
    console.log("User saved successfully:", user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Signup failed with error:", error);
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

module.exports = { signup, login };
