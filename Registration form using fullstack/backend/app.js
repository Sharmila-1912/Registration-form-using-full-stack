const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/myform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  phone: String,
  password: String,
  gender: String,
  profilePic: String
});

const User = mongoose.model('User', userSchema);

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/submit', upload.single('profilePic'), async (req, res) => {
  const { name, email, username, phone, password, gender } = req.body;
  const profilePic = req.file ? req.file.buffer.toString('base64') : '';

  const newUser = new User({
    name,
    email,
    username,
    phone,
    password,
    gender,
    profilePic
  });

  try {
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
