const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Task = require('./api/models/Task.js');
const User = require('./api/models/User.js');
const cookieParser = require('cookie-parser');
const { apiRoute } = require('./api/routes/routes.js');

require('dotenv').config();
console.log('Mongo Username', process.env.MONGO_USERNAME);
console.log('Mongo Password', process.env.MONGO_PASSWORD);
// MongoDB connection string (replace <dbname> with your DB name)
const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@to-done.bdj13.mongodb.net/?retryWrites=true&w=majority&appName=To-Done`;

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB'));

// Allows requests from React frontend
app.use(
  cors({
    origin: ['https://localhost:3000', process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json()); // Parses JSON request bodies
app.use(cookieParser()); // Allows us to access cookies from requests
app.use('/api', apiRoute);

// Route
app.get('/api', (req, res) => {
  res.json({ message: 'Backend says hello!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT + '.');
});
