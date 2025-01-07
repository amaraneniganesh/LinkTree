import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    gmailUsername: '',
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('User registered successfully');
        setTimeout(() => {
          navigate('/'); // Redirect to the homepage after successful registration
        }, 1000); // Add a slight delay for the message to display
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
