import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PublicLinks.css';
import config from '../config';

const PublicLinks = () => {
  const { username } = useParams();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/api/links/public/${username}`);
        if (response.ok) {
          const data = await response.json();
          setLinks(data);
        }
      } catch (error) {
        console.error('Error fetching public links:', error);
      }
    };
    fetchLinks();
  }, [username]);

  return (
    <div className="public-links-container">
      <h2>Links Shared by {username}</h2>
      <div className="links-lists">
        {links.map((link) => (
          <div
            className="link-cardss"
            key={link.id}
            onClick={() => window.open(link.url, '_blank')}
          >
            <h3>{link.appName}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicLinks;
