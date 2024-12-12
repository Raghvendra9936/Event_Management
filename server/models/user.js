const mongoose = require('mongoose');

let User;

try {
  User = mongoose.model('User');
} catch (error) {
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

  User = mongoose.model('User', userSchema);
}

module.exports = User;
