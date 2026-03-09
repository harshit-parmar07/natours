import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const NavItem = ({ link, text, icon, active }) => (
  <li className={active ? 'side-nav--active' : ''}>
    <a href={link}>
      <svg>
        <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
      </svg>
      {text}
    </a>
  </li>
);

const Account = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  
  // Data state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  
  // Password state
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  
  // Status hooks
  const [updatingData, setUpdatingData] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [message, setMessage] = useState('');

  // Initialize state when user is defined
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (loading) return <main className="main"><div className="loader">Loading...</div></main>;
  if (!user) return <Navigate to="/login" replace />;

  const handleUserDataUpdate = async (e) => {
    e.preventDefault();
    setUpdatingData(true);
    setMessage('');
    
    try {
      const form = new FormData();
      form.append('name', name);
      form.append('email', email);
      if (photo) form.append('photo', photo);

      const res = await api.patch('/users/updateMe', form);
      setUser(res.data.data.user);
      setMessage('Data updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating data');
    } finally {
      setUpdatingData(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setUpdatingPassword(true);
    setMessage('');

    try {
      await api.patch('/users/updateMyPassword', {
        passwordCurrent,
        password,
        passwordConfirm
      });
      
      setMessage('Password updated successfully!');
      setPasswordCurrent('');
      setPassword('');
      setPasswordConfirm('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating password');
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <NavItem link="#" text="Settings" icon="settings" active={true} />
            <NavItem link="/my-tours" text="My bookings" icon="briefcase" active={false} />
            <NavItem link="#" text="My reviews" icon="star" active={false} />
            <NavItem link="#" text="Billing" icon="credit-card" active={false} />
          </ul>

          {user.role === 'admin' && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem link="#" text="Manage tours" icon="map" active={false} />
                <NavItem link="#" text="Manage users" icon="users" active={false} />
                <NavItem link="#" text="Manage reviews" icon="star" active={false} />
                <NavItem link="#" text="Manage bookings" icon="briefcase" active={false} />
              </ul>
            </div>
          )}
        </nav>

        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
            
            {message && <div style={{textAlign:'center', fontSize: '1.4rem', color: '#ff7730', marginBottom:'1.5rem'}}>{message}</div>}

            <form className="form form-user-data" onSubmit={handleUserDataUpdate}>
              <div className="form__group">
                <label className="form__label" htmlFor="name">Name</label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src={`/img/users/${user.photo}`}
                  alt="User photo"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                  onChange={e => setPhoto(e.target.files[0])}
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button
                  className="btn btn--small btn--green"
                  disabled={updatingData}
                >
                  {updatingData ? 'Saving...' : 'Save settings'}
                </button>
              </div>
            </form>
          </div>

          <div className="line">&nbsp;</div>

          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-password" onSubmit={handlePasswordUpdate}>
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">Current password</label>
                <input
                  id="password-current"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  value={passwordCurrent}
                  onChange={e => setPasswordCurrent(e.target.value)}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="password">New password</label>
                <input
                  id="password"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">Confirm password</label>
                <input
                  id="password-confirm"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength="8"
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                />
              </div>
              <div className="form__group right">
                <button
                  className="btn btn--small btn--green btn--save-password"
                  disabled={updatingPassword}
                >
                  {updatingPassword ? 'Saving...' : 'Save password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Account;
