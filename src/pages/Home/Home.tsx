import React, { useState, useEffect } from 'react';
import { getClients, getSitesWithPagination } from '../../services/api';
import { Link } from 'react-router-dom';
import { Site } from '../../types/Site';
import './Home.css';

const Home = () => {
  const [totalSites, setTotalSites] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [recentSites, setRecentSites] = useState<Site[]>([]); // Specify type here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await getClients();
        const { data: sitesData } = await getSitesWithPagination(1, 5);

        setTotalClients(clientsData.length);
        setTotalSites(sitesData.length);
        setRecentSites(sitesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to Site Explorer</h1>
      <div className="metrics">
        <div className="metric-item">
          <h3>Total Sites</h3>
          <p>{totalSites}</p>
        </div>
        <div className="metric-item">
          <h3>Total Clients</h3>
          <p>{totalClients}</p>
        </div>
      </div>
      <div className="recent-sites">
        <h2>Recently Added Sites</h2>
        <ul>
          {recentSites.map((site) => (
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
