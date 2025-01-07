import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import config from '../config'; // Import the config file

const Register = () => {
  const [formData, setFormData] = useState({
    gmailUsername: '',
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.backendUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('User registered successfully');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage('Username or Gmail username already exists');
      }
    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div className="auth-container-ump">
      <form className="auth-form-ump" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          name="gmailUsername"
          placeholder="Gmail Username"
          value={formData.gmailUsername}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {message && <p className="auth-message-ump">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
