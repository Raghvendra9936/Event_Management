const mongoose = require('mongoose');
const User = require('./models/user'); // Import the User model

// Replace with your MongoDB connection string
const DB_URI = 'mongodb://localhost:27017/event_management';

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log('Error connecting to database:', error));

// Create dummy users
const dummyUsers = [
  { username: 'adminUser', password: 'admin123', role: 'admin' },
  { username: 'vendorUser', password: 'vendor123', role: 'vendor' },
  { username: 'regularUser', password: 'user123', role: 'user' },
];

const seedDatabase = async () => {
  try {
    // Clear the database first to avoid duplicates
    await User.deleteMany({});

    // Insert dummy data
    await User.insertMany(dummyUsers);
    console.log('Dummy data successfully inserted');
  } catch (error) {
    console.log('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
