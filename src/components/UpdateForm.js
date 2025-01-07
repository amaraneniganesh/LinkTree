import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateForm.css';
import config from '../config';

const UpdateForm = () => {
  const { id } = useParams(); // Get the link ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    appName: '',
    url: '',
  });

  const [loading, setLoading] = useState(true);

  // Fetch the existing link details when the component mounts
  useEffect(() => {
    const fetchLinkDetails = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/api/links/${id}`); // Adjust the endpoint as needed
        if (response.ok) {
          const data = await response.json();
          setFormData({
            appName: data.appName,
            url: data.url,
          });
        } else {
          console.error('Failed to fetch link details');
        }
      } catch (error) {
        console.error('Error fetching link details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkDetails();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${config.backendUrl}/api/links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Link updated successfully!');
        navigate('/dashboard'); // Redirect back to the dashboard
      } else {
        alert('Failed to update the link.');
      }
    } catch (error) {
      console.error('Error updating link:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-form-container">
      <h2>Update Link</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <label>
          Application Name:
          <input
            type="text"
            name="appName"
            value={formData.appName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          URL:
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
