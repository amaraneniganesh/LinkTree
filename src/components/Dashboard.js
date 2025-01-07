import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import config from "../config";

const Dashboard = ({ loggedInUser, handleLogout }) => {
  const [links, setLinks] = useState([]);
  const [shareUrl, setShareUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(
          `${config.backendUrl}/api/links?username=${loggedInUser}`
        );
        if (response.ok) {
          const data = await response.json();
          setLinks(data);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };
    if (loggedInUser) {
      fetchLinks();
      setShareUrl(`${window.location.origin}/public/${loggedInUser}`);
    }
  }, [loggedInUser]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Shareable link copied to clipboard!");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${config.backendUrl}/api/links/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Link deleted successfully!");
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleUpdate = (link) => {
    navigate("/update-link", { state: link });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {loggedInUser}</h2>
        <div className="dashboard-actions">
          <button className="Btn-ads" onClick={handleLogout}>
  <div className="sign-ads">
    <svg viewBox="0 0 512 512">
      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
    </svg>
  </div>
  <div className="text-ads">Logout</div>
</button>

          <button className="okra" onClick={copyToClipboard}>
  <span className="text">Share</span>
  <svg
    className="share-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
    ></path>
  </svg>
</button>

          
        </div>
      </div>
      <div className="links-list">
        {links.map((link) => (
          <div className="link-card" key={link.id}>
            <h3>{link.appName}</h3>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
            <p>Created on: {new Date(link.createdTime).toLocaleString()}</p>
            <div className="link-actions">
            <button className="ass-edit-button" onClick={() => navigate(`/update/${link.id}`)}>
  <svg className="ass-edit-svgIcon" viewBox="0 0 512 512">
    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
  </svg>
</button>

              <button className="ass-button" onClick={() => handleDelete(link.id)}>
  <svg viewBox="0 0 448 512" className="ass-svgIcon">
    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
  </svg>
</button>

            </div>
          </div>
        ))}
      </div>
      <div className="add-link-button-container">
        <button
          className="add-link-button-ls"
          title="Add New Link"
          onClick={() => navigate("/add-links")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke-width="1.5"
            ></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
