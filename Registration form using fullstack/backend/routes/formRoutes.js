// formRoutes.js

const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData'); // Import your Mongoose model

// POST route to handle form submission
router.post('/submit', async (req, res) => {
  const { name, email, username, phone, password, gender, profilePic } = req.body;

  try {
    const formData = new FormData({
      name,
      email,
      username,
      phone,
      password,
      gender,
      profilePic
    });

    await formData.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(400).json({ message: 'Unable to register: ' + err });
  }
});

module.exports = router;
