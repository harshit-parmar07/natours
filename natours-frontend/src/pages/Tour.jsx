import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import MapBox from '../components/MapBox';

const OverviewBox = ({ label, text, icon }) => (
  <div className="overview-box__detail">
    <svg className="overview-box__icon">
      <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
    </svg>
    <span className="overview-box__label">{label}</span>
    <span className="overview-box__text">{text}</span>
  </div>
);

const Tour = () => {
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        // Step 1: Get the tour ID via the slug query
        const slugRes = await api.get(`/tours?slug=${slug}`);
        const tourBasic = slugRes.data.data.data[0];

        if (!tourBasic) {
          setTour(null);
          setLoading(false);
          return;
        }

        // Step 2: Fetch the full tour by ID (this uses getOne which populates reviews)
        const fullRes = await api.get(`/tours/${tourBasic._id}`);
        setTour(fullRes.data.data.data);
      } catch (err) {
        console.error('Error fetching tour:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  const handleBookTour = async (tourId) => {
    try {
      setBookingLoading(true);
      const res = await api.get(`/bookings/checkout-session/${tourId}`);
      // Redirect to Stripe checkout
      window.location.assign(res.data.session.url);
    } catch (err) {
      console.error('Error booking tour:', err);
      alert(err.response?.data?.message || 'Error creating checkout session');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <main className="main"><div className="loader">Loading...</div></main>;
  if (!tour) return <main className="main"><div className="error">Tour not found</div></main>;

  const date = new Date(tour.startDates[0]).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric'
  });
  const paragraphs = tour.description.split('\n');

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
            className="header__hero-img"
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name} tour</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock" />
              </svg>
              <span className="heading-box__text">{tour.duration} days</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span className="heading-box__text">{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              <OverviewBox label="Next date" text={date} icon="calendar" />
              <OverviewBox label="Difficulty" text={tour.difficulty} icon="trending-up" />
              <OverviewBox label="Participants" text={`${tour.maxGroupSize} people`} icon="user" />
              <OverviewBox label="Rating" text={`${tour.ratingsAverage} / 5`} icon="star" />
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map(guide => (
                <div key={guide._id || guide.id} className="overview-box__detail">
                  <img
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                    className="overview-box__img"
                  />
                  {guide.role === 'lead-guide' && <span className="overview-box__label">Lead guide</span>}
                  {guide.role === 'guide' && <span className="overview-box__label">Tour guide</span>}
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">About {tour.name} tour</h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="description__text">{p}</p>
          ))}
        </div>
      </section>

      <section className="section-pictures">
        {tour.images.map((img, i) => (
          <div key={i} className="picture-box">
            <img
              src={`/img/tours/${img}`}
              alt={`The Park Camper Tour ${i + 1}`}
              className={`picture-box__img picture-box__img--${i + 1}`}
            />
          </div>
        ))}
      </section>

      <MapBox locations={tour.locations} />

      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews?.map(review => (
            <ReviewCard key={review._id || review.id} review={review} />
          ))}
        </div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img src={`/img/tours/${tour.images[1]}`} alt="Tour picture" className="cta__img cta__img--1" />
          <img src={`/img/tours/${tour.images[2]}`} alt="Tour picture" className="cta__img cta__img--2" />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {tour.duration} days. 1 adventure. Infinite memories. Make it yours today!
            </p>
            {user ? (
              <button
                className="btn btn--green span-all-rows"
                id="book-tour"
                disabled={bookingLoading}
                onClick={() => handleBookTour(tour.id || tour._id)}
              >
                {bookingLoading ? 'Processing...' : 'Book tour now!'}
              </button>
            ) : (
              <Link to="/login" className="btn btn--green span-all-rows">
                Log in to book tour
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Tour;

