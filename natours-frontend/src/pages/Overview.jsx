import { useEffect, useState } from 'react';
import api from '../utils/api';
import TourCard from '../components/TourCard';

const Overview = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await api.get('/tours');
        // Setting state array based on successful JSend API response
        setTours(res.data.data.data);
      } catch (err) {
        console.error('Error fetching tours:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) {
    return <main className="main"><div className="loader">Loading tours...</div></main>;
  }

  return (
    <main className="main">
      <div className="card-container">
        {tours.map(tour => (
          <TourCard key={tour._id || tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
};

export default Overview;
