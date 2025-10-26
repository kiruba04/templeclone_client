import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Button from 'react-bootstrap/Button';

function LoginPage() {
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://templeclone-backend.onrender.com/api/auth/login', {
        phone,
        password,
      }, { withCredentials: true });

      const userWithType = {
          ...response.data.user,
          userType: response.data.userType,
          };

      localStorage.setItem('user', JSON.stringify(userWithType));


      // Clear error message if any
      setErrorMessage('');

      // Navigate to home
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Optional: show on screen
      } else {
        setErrorMessage('Wrong phone number or password'); // Optional: show on screen
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='logincenter'>
      <form className="form" onSubmit={handleLogin}>
        <p className="form-title">Login to your account</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button variant="outline-info" onClick={toggleShowPassword} className="mt-2">
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </div>

        {/* Optional: Show error message on screen */}
        {errorMessage && (
          <p className="text-danger mt-2" style={{ fontSize: '14px' }}>
            {errorMessage}
          </p>
        )}

        <button type="submit" className="submit mt-3">
          Login
        </button>

        <p className="signup-link">
          No account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
