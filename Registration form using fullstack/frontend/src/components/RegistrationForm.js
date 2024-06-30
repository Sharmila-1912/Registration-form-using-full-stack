// RegistrationForm.js

import React, { useState } from 'react';
import axios from 'axios';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    profilePic: null
  });

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('profilePic', formData.profilePic);

    try {
      const res = await axios.post('http://localhost:3000/submit', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      // Optionally handle success response
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error
    }
  };

  return (
    <div className="main1" id="m1">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Full Name:</label>
        <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required /><br />
        <label>Email:</label>
        <input type="email" name="email" placeholder="Enter your Email" onChange={handleChange} required /><br />
        <label>Username:</label>
        <input type="text" name="username" placeholder="Enter your username" onChange={handleChange} required /><br />
        <label>Phone number:</label>
        <input type="tel" name="phone" placeholder="Enter your phone number" onChange={handleChange} required /><br />
        <label>Password:</label>
        <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required /><br />
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required /><br />
        <div id="radio">
          <label>Gender:</label>
          <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female<br />
        </div>
        <label>Profile Picture:</label>
        <input type="file" name="profilePic" accept="image/*" onChange={handleChange} required /><br />
        <button type="submit" id="b">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
