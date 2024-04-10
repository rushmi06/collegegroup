const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  id: String,
  email: {
    type: String,
    unique: true
  },
  number: String,
  graduation: String,
  branch: String,
  year: String,
  class: String,
  image: String,
  address: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
