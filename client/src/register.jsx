import React, { useState } from 'react';
import axios from 'axios';
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

    try{
        const response = await axios.post('http://localhost:3500/register-user',{
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
        console.log(response);
    }catch(err){
        console.log(err);
    }
    setFormData({
      username: '',
      email: '',
      password: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
