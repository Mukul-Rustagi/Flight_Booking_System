const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to handle user registration
const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, phoneNumber, role } = req.body;

  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Set a default role if no role is passed (e.g., 'user')
    const userRole = role || 'user';

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      role: userRole, // Set the role, defaulting to 'user' if none provided
    });

    // Save the new user to the database
    await newUser.save();

    // After user registration, generate a JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },  // Payload
      process.env.JWT_SECRET, // Use the secret from the environment variable
      { expiresIn: '1h' } // Token expiry
    );

    // Respond with success and send the token
    res.status(201).json({
      message: 'User created successfully',
      token, // Send the generated token
    });
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to handle user login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username or email
    const user = await User.findOne({ $or: [{ email: username }, { username }] });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
   console.log(user);
    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },  // Payload
      process.env.JWT_SECRET, // Use the secret from the environment variable
      { expiresIn: '1h' } // Expiry time
    );


    // Return token in response
    return res.json({
      message: 'Login successful',
      token,
    });

  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the controller functions
module.exports = {
  registerUser,
  loginUser,
};
