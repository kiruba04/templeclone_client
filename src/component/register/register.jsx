import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './register.css';
import Button from 'react-bootstrap/Button';

function RegisterPage() {
  const location = useLocation();
 
  const [userDetails, setUserDetails] = useState({
    username: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (location.state && location.state.userDetails) {
      const formattedDate = formatDate(location.state.userDetails.dateOfBirth);
      setUserDetails({
        ...location.state.userDetails,
        dateOfBirth: formattedDate, // Set the formatted date
      });
    }
  }, [location.state]);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!location.state) { // Only check passwords if registering
        if (userDetails.password !== userDetails.confirmPassword) {
          throw new Error("Passwords don't match");
        }
      }

      if (location.state && location.state.userDetails) {
        await axios.put(`https://venkatesaperumal-backend.onrender.com/api/users/${userDetails._id}`, userDetails);
        

      } else {
        await axios.post('https://venkatesaperumal-backend.onrender.com/api/auth/register', userDetails);
        
      }

      setUserDetails({
        username: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        address: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='height'>
      <div className="registercenter">
        <form className="form1" onSubmit={handleRegister}>
          <p className="form-title">{location.state ? "Edit your details" : "Complete your registration"}</p>

          <div className="input-container">
            <input
              type="text"
              placeholder="Enter username"
              value={userDetails.username}
              onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              required
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Enter last name"
              value={userDetails.lastname}
              onChange={(e) => setUserDetails({ ...userDetails, lastname: e.target.value })}
            />
          </div>

          {!location.state && (
            <>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={userDetails.password}
                  onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  required
                />
              </div>

              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={userDetails.confirmPassword}
                  onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
                  required
                />
                <Button variant="outline-info" onClick={toggleShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </>
          )}

            <div className="input-container">
            <input
              type="date"
              placeholder="Enter date of birth"
              value={userDetails.dateOfBirth} // Date in "yyyy-MM-dd" format
              onChange={(e) => setUserDetails({ ...userDetails, dateOfBirth: e.target.value })}
            />
          </div>

          <div className="input-container">
            <input
              type="email"
              placeholder="Enter email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />
          </div>

          <div className="input-container">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={userDetails.phone}
              onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
              required
            />
          </div>

          <div className="input-container">
            <input
              type="text"
              placeholder="Enter address"
              value={userDetails.address}
              onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="submit">
            {location.state ? "Update" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
