import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import Layout from './components/Layout/Layout';
import Alert from './components/Alert';

import Overview from './pages/Overview';
import Tour from './pages/Tour';
import Login from './pages/Login';
import Account from './pages/Account';
import MyTours from './pages/MyTours';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Alert />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Overview />} />
              <Route path="tour/:slug" element={<Tour />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="me" element={<Account />} />
              <Route path="my-tours" element={<MyTours />} />
            </Route>
          </Routes>
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
