const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// server.js (Node.js/Express Backend)

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const User = require('./models/user');


dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(session({
  secret: 'event_management_secret',
  resave: false,
  saveUninitialized: true,
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/event_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['admin', 'user', 'vendor'], required: true },
});
const MembershipSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  duration: { type: String, enum: ['6 months', '1 year', '2 years'], default: '6 months' },
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
});
const ProductSchema = new mongoose.Schema({
  vendorId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number,
});
// const User = mongoose.model('User', UserSchema);
const Membership = mongoose.model('Membership', MembershipSchema);
const Product = mongoose.model('Product', ProductSchema);

// Routes

app.get('/', async (req, res) => {
    const user = await User.find();
    res.json(user);
  });

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.user = user;
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Add Membership
app.post('/membership', async (req, res) => {
  if (req.session.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const { userId, duration } = req.body;
  const membership = new Membership({ userId, duration });
  await membership.save();
  res.json({ message: 'Membership added successfully', membership });
});

// Update Membership
app.put('/membership/:id', async (req, res) => {
  const { id } = req.params;
  const { duration, status } = req.body;
  const membership = await Membership.findByIdAndUpdate(id, { duration, status }, { new: true });
  res.json({ message: 'Membership updated successfully', membership });
});

// Add Product
app.post('/product', async (req, res) => {
  if (req.session.user?.role !== 'vendor') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const { name, price, quantity } = req.body;
  const product = new Product({ vendorId: req.session.user._id, name, price, quantity });
  await product.save();
  res.json({ message: 'Product added successfully', product });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

