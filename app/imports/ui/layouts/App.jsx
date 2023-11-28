import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from '../pages/Landing';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import ClubDetail from '../pages/ClubDetail';
import ListClubs from '../pages/ListClubs';
import ListEvents from '../pages/ListEvents';
import ListClubAdmin from '../pages/ListClubAdmin';
import ClubFinder from '../pages/ClubFinder';
import Footer from '../components/Footer';
import Profile from '../pages/Profile';
import AddClub from '../pages/AddClub';

const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <AnimatedRoutes />
      <Footer />
    </div>
  </Router>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return { ready: rdy };
  });

  return (
    <AnimatePresence>
      <motion.div key={location.pathname}>
        <Routes location={location}>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/upcoming-events" element={<ListEvents />} />
          <Route path="/my-clubs" element={<ProtectedRoute><ListClubs /></ProtectedRoute>} />
          <Route path="/search-clubs" element={<ProtectedRoute><ClubFinder /></ProtectedRoute>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/clubdetail" element={<ClubDetail />} />
          <Route path="/create-club" element={<ProtectedRoute><AddClub /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditStuff /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><ListClubAdmin /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
