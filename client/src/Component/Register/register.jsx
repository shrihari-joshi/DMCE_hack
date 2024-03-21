import React, { useState } from 'react';
import axios from 'axios';
import './register.css'
function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform form validation or submit data here
    console.log(formData);
    // Reset form after submission

    try {
      const response = await axios.post('http://localhost:3500/register-user', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <div>
      <div className='Register-text'>
        <form onSubmit={handleSubmit} className='Textu'>
          <a className='kasaye' href="">Register</a>
          <hr />
          <br />
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder='Username'
            className='karInput'
            />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder='E-Mail'
            className='karInput'
            />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder='Password'
            className='karInput'
          />
          <button type="submit" className='tuButtonhai'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
