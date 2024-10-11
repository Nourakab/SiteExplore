import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { getUserProfile } from '../../services/api';
import UserProfile from '../../components/UserProfile/UserProfile';
import './Home.css';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state for user profile
  const { clients, sites, loading, error } = useFetchData(1, 5); // Fetch sites and clients

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUserProfile();

        setUserName(userData.givenName || 'User');
        setAvatarUrl(userData.avatar || 'https://via.placeholder.com/150');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchProfile();
  }, []);

  if (isLoading || loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="home-container">
      <div className="metrics">
        <div className="metric-item">
          <h3>Total Sites</h3>
          <p>{sites.length}</p>
        </div>
        <UserProfile avatarUrl={avatarUrl} givenName={userName} />
        <div className="metric-item">
          <h3>Total Clients</h3>
          <p>{clients.length}</p>
        </div>
      </div>
      <div className="recent-sites">
        <h2>Recently Added Sites</h2>
        <ul>
          {sites.map((site) => (
            <li key={site.id}>
              {site.title} - {new Date(site.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
      <div className="navigation-links">
        <Link to="/sites">
          <button>View All Sites</button>
        </Link>
        <Link to="/clients">
          <button>View All Clients</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
