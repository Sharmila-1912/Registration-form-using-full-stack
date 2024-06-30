// FormData.js

const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  phone: String,
  password: String,
  gender: String,
  profilePic: String  // Assuming storing image URL
});

module.exports = mongoose.model('FormData', formDataSchema);
