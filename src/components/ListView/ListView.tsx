import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { Site } from '../../types/Site';
import './ListView.css';

interface ListViewProps {
  sites: Site[];
}

const ListView = ({ sites }: ListViewProps) => {
  return (
    <ul className="list-view">
      {sites.map((site) => (
        <li key={site.id} className="list-view-item">
          <div className="site-info">
            <h3>{site.title}</h3>

            {/* Use the Carousel component */}
            {site.images.length > 0 && (
              <Carousel images={site.images} title={site.title} />
            )}
            <div className="site-details">
              <p>
                {site.address.street}, {site.address.city},{' '}
                {site.address.country}
              </p>
              <p>
                Contact: {site.contacts.main.firstName}{' '}
                {site.contacts.main.lastName}
              </p>

              {/* More details button */}
              <Link to={`/details/${site.id}`} className="details-button">
                More Details
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListView;
