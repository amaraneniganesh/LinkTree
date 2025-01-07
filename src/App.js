import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddLink from './components/AddLink';
import PublicLinks from './components/PublicLinks';
import UpdateForm from './components/UpdateForm';

const App = () => {
  const [loggedInUser, setLoggedInUser] = React.useState('');

  React.useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser('');
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            loggedInUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login
                setLoggedInUser={(user) => {
                  localStorage.setItem('loggedInUser', user);
                  setLoggedInUser(user);
                }}
              />
            )
          }
        />

        {/* Register Route */}
        <Route
          path="/register"
          element={
            loggedInUser ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register />
            )
          }
        />

        {/* Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            loggedInUser ? (
              <Dashboard loggedInUser={loggedInUser} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Add New Links Route */}
        <Route
          path="/add-links"
          element={
            loggedInUser ? (
              <AddLink loggedInUser={loggedInUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Public Links Route */}
        <Route path="/public/:username" element={<PublicLinks />} />

        {/* Update Link Route */}
        <Route
          path="/update/:id"
          element={
            loggedInUser ? (
              <UpdateForm />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
