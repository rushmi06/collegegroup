const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  password: String,
  id: String,
  email: {
    type: String,
    unique: true
  },
  number: String,
  branch: String,
  designation: String,
  image: String
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
