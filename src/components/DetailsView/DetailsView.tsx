import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSiteDetails } from '../../services/api';
import { Site } from '../../types/Site';
import { FaRegUser } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { TiBusinessCard } from 'react-icons/ti';
import { FaPhone } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import './DetailsView.css';

const DetailsView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Hook to navigate back
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSiteDetails = async () => {
        try {
          const data = await getSiteDetails(id);
          setSite(data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Failed to load site details');
          setLoading(false);
        }
      };

      fetchSiteDetails();
    } else {
      setError('No site ID provided');
      setLoading(false);
    }
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page (ListView)
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="details-view">
      <div className="back-button">
        <button onClick={handleBackClick}>← Back to list</button>
      </div>
      <img src={site?.images[0]} alt={site?.title} className="details-image" />
      <h1>{site?.title}</h1>
      <p>
        <IoLocationSharp /> {site?.address.street}, {site?.address.city},{' '}
        {site?.address.country}
      </p>

      <div className="contact-info">
        <p>
          <FaRegUser /> Contact: {site?.contacts.main.firstName}{' '}
          {site?.contacts.main.lastName}
        </p>
        <p>
          {' '}
          <TiBusinessCard /> Title: {site?.contacts.main.jobTitle}
        </p>
        <p>
          {' '}
          <FaPhone />
          Phone: {site?.contacts.main.phoneNumber}
        </p>
        <p>
          <MdOutlineMail />
          Email: {site?.contacts.main.email}
        </p>
      </div>
    </div>
  );
};

export default DetailsView;
