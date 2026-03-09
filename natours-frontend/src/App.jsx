import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';

import Overview from './pages/Overview';
import Tour from './pages/Tour';
import Login from './pages/Login';
import Account from './pages/Account';
import MyTours from './pages/MyTours';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="tour/:slug" element={<Tour />} />
            <Route path="login" element={<Login />} />
            <Route path="me" element={<Account />} />
            <Route path="my-tours" element={<MyTours />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
