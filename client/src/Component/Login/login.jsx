import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import SignUpForm from '../Register/register';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8000/login-user?username=${username}&password=${password}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log(response.data); // Assuming the response contains user data

      // Store user data in localStorage if needed
      localStorage.setItem('user', JSON.stringify(response.data));

      // Navigate to the lobby page
      navigate('/lobby');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
    <div className='wrapper'>
      <div className={`login-text ${isExpanded ? 'expand' : ''}`}>
        <button className="cta" onClick={toggleExpansion}>But</button>
        <form onSubmit={handleSubmit} className={`text ${isExpanded ? 'show-hide' : ''}`}>
          <a className='tasaye' href="">Login</a>
          <hr />
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder='Username'
            className="input-field"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder='Password'
            className="input-field"
          />
          <button type="submit" className="login-btn">Submit</button>
        </form>
      </div>
      <div className={`call-text ${isExpanded ? 'show-hide' : ''}`}>
        {!isExpanded && <SignUpForm />}
      </div>
    </div>
  );
}

export default LoginForm;
