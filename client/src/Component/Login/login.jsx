import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import SignUpForm from '../Register/register';
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [check, setCheck] = useState(0);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    setCheck((prevCheck) => prevCheck === 0 ? 1 : 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:3500/login-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response);
      console.log('Username:', username);
      console.log('Password:', password);

      // Clear input fields after successful submission
      setUsername('');
      setPassword('');
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
