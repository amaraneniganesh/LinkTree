import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config"; // Import the config file
import "./AddLink.css";

const AddLink = ({ loggedInUser }) => {
  const [formData, setFormData] = useState({
    appName: "",
    url: "",
  });
  const [message, setMessage] = useState(null); // null when no notification
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLink = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${config.backendUrl}/api/links?username=${loggedInUser}`, // Use backendUrl from config
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setMessageType("success");
        setMessage("Link added successfully!");
        setTimeout(() => {
          setMessage(null);
          navigate("/dashboard");
        }, 2000); // Success message disappears after 2 seconds
      } else {
        setMessageType("error");
        setMessage("Error adding link.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Error adding link.");
    }
  };

  return (
    <div className="auth-container-ak47">
      <form className="auth-form-ak47" onSubmit={handleAddLink}>
        <h2>Add New Link</h2>
        <div className="form-ak47">
          <input
            type="text"
            placeholder="Application Name"
            name="appName"
            value={formData.appName}
            onChange={handleChange}
            className="input-ak47"
            required
          />
          <span className="input-border-ak47"></span>
        </div>
        <div className="form-ak47">
          <input
            type="url"
            placeholder="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="input-ak47"
            required
          />
          <span className="input-border-ak47"></span>
        </div>
        <button type="submit" className="button-ak47">
          Add Link
          <svg className="icon-ak47" viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {message && (
          <div className={`notifier-ak47 ${messageType}-ak47`}>{message}</div>
        )}
      </form>
    </div>
  );
};

export default AddLink;
