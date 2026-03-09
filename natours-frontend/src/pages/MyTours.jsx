import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import TourCard from '../components/TourCard';

const MyTours = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyTours = async () => {
      try {
        const res = await api.get('/bookings/my-tours');
        setTours(res.data.data.tours);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching your bookings');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyTours();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (authLoading || loading) {
    return <main className="main"><div className="loader">Loading your bookings...</div></main>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return <main className="main"><div className="error__msg" style={{textAlign: 'center', fontSize: '1.4rem'}}>{error}</div></main>;
  }

  return (
    <main className="main">
      <div className="card-container">
        {tours.length === 0 ? (
          <h2 className="heading-secondary" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            You haven't booked any tours yet.
          </h2>
        ) : (
          tours.map(tour => (
            <TourCard key={tour._id || tour.id} tour={tour} />
          ))
        )}
      </div>
    </main>
  );
};

export default MyTours;
