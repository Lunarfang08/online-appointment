// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const path = require('path');
// const cors = require('cors'); // Import cors middleware

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS
// // Connect to MongoDB database
// mongoose.connect('mongodb+srv://arsaladnan07:Arsal072@cluster0.xtkffqg.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Create user schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// // Create user model
// const User = mongoose.model('User', userSchema);

// // Serve static files (React app build)
// app.use(express.static(path.join(__dirname, 'client/build')));

// // Signup route
// app.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error during sign up:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Play game route (protected)
// app.post('/play-game', (req, res) => {
//   res.status(200).json({ message: 'You are playing the game!' });
// });

// // Route for Game1
// app.get('/game1', (req, res) => {
//   res.status(200).json({ message: 'This is Game 1!' });
// });

// // Route for Game2
// app.get('/game2', (req, res) => {
//   res.status(200).json({ message: 'This is Game 2!' });
// });

// // Route for Game3
// app.get('/game3', (req, res) => {
//   res.status(200).json({ message: 'This is Game 3!' });
// });

// // Route for Game4
// app.get('/game4', (req, res) => {
//   res.status(200).json({ message: 'This is Game 4!' });
// });

// // Route for Game5
// app.get('/game5', (req, res) => {
//   res.status(200).json({ message: 'This is Game 5!' });
// });

// // Route for Game6
// app.get('/game6', (req, res) => {
//   res.status(200).json({ message: 'This is Game 6!' });
// });

// app.get('/game7', (req, res) => {
//   res.status(200).json({ message: 'This is Game 7!' });
// });

// app.get('/game8', (req, res) => {
//   res.status(200).json({ message: 'This is Game 8!' });
// });

// app.get('/game9', (req, res) => {
//   res.status(200).json({ message: 'This is Game 9!' });
// });

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'This is Home!' });
// });

// app.get('/contact', (req, res) => {
//   res.status(200).json({ message: 'This is contact!' });
// });
// app.get('/about', (req, res) => {
//   res.status(200).json({ message: 'This is about!' });
// });
// app.get('/Sign', (req, res) => {
//   res.status(200).json({ message: 'This is Signup!' });
// });

// // Catch-all route for serving React app
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// // Start server
// app.listen(PORT, '192.168.100.8', () => {
//   console.log(`Server is running on http://192.168.100.8:${PORT}`);
// });

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Create Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow all origins

// Connect to MongoDB database
mongoose.connect('mongodb+srv://arsaladnan07:Arsal072@cluster0.xtkffqg.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create user model
const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during sign up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(express.static(path.join('C:/Users/DELL/OneDrive/Desktop/React/my-app/build')));

// Catch-all route handler
app.get('*', (req, res) => {
  res.sendFile(path.resolve('C:/Users/DELL/OneDrive/Desktop/React/my-app/build', 'index.html'));
});

// Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

app.listen(PORT, '192.168.100.8', () => {
  console.log(`Server is running on http://192.168.100.8:${PORT}`);
});