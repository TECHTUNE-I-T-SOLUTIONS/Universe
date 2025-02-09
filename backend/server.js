// server.js
require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a User schema and model (with username)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  nickname: { type: String },
  phoneNumber: { type: String },
  department: { type: String },
  courseOffered: { type: String },
  facultyOfStudy: { type: String },
  favoriteCourses: { type: String },
  image: { type: String }, // for profile image (base64 or URL)
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Create an in-memory store for signup codes
// Structure: { [email]: { code: "123456", expires: 1234567890 } }
const signupCodes = {};

// Configure NodeMailer transporter using Gmail (with app password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g., your-email@gmail.com
    pass: process.env.EMAIL_PASS, // your app password from Google
  },
});

// ---------------------------
// Route: Send Signup Code
// ---------------------------
app.post('/api/send-signup-code', async (req, res) => {
  const { email } = req.body;
  if (!(email.endsWith("@unilorin.edu.ng") || email.endsWith("@gmail.com"))) { 
    return res.status(400).json({ message: "Only university emails are allowed." });
  }

  // Generate a 6-digit random code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store the code in memory (expires in 5 minutes)
  signupCodes[email] = { code, expires: Date.now() + 5 * 60 * 1000 };
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Signup Code",
    text: `Your signup code is: ${code}`,
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Error sending email", error: error.toString() });
    }
    // In production, do not return the code in the response.
    res.status(200).json({ message: "Signup code sent successfully." });
  });
});

// ---------------------------
// Route: Verify Signup Code
// ---------------------------
app.post('/api/verify-signup-code', (req, res) => {
  const { email, code } = req.body;
  const record = signupCodes[email];
  if (!record) {
    return res.status(400).json({ message: "No signup code found for this email." });
  }
  if (Date.now() > record.expires) {
    delete signupCodes[email];
    return res.status(400).json({ message: "Signup code expired." });
  }
  if (record.code !== code) {
    return res.status(400).json({ message: "Invalid signup code." });
  }
  // Code is valid—remove it so it cannot be reused.
  delete signupCodes[email];
  res.json({ message: "Signup code verified successfully." });
});

// ---------------------------
// Route: Signup (includes username)
// ---------------------------
app.post('/api/signup', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// ---------------------------
// Route: Login
// ---------------------------
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});


// ---------------------------
// Protected Route Example
// ---------------------------
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'This is protected data.' });
});

// In server.js, add this route to fetch user details
app.get('/api/user', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
});

// Update profile endpoint
app.put('/api/update-profile', authenticate, async (req, res) => {
  const { nickname, phoneNumber, department, courseOffered, facultyOfStudy, favoriteCourses, image } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Update the user's details
    user.nickname = nickname;
    user.phoneNumber = phoneNumber;
    user.department = department;
    user.courseOffered = courseOffered;
    user.facultyOfStudy = facultyOfStudy;
    user.favoriteCourses = favoriteCourses;
    user.image = image;
    await user.save();
    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
