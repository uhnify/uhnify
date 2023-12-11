import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { Gear, PersonFill } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from './LoadingSpinner'; // Import Bootstrap CSS

const NavBar = () => {
  const { currentUser, isAdmin } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin'),
  }), []);

  const { ready, profile } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const userProfile = Profiles.collection.findOne({ userId: Meteor.userId() });
    return {
      ready: subscription.ready(),
      profile: userProfile,
    };
  }, []);

  return ready ? (
    <Navbar expand="lg" className="dark-green-navbar py-xl-5">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src="/images/UHnifyLogozz.png" alt="UHnify Logo" width="250" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser && (
              <NavDropdown id="club-drop" title="ClubHub">
                <NavDropdown.Item id="browse-clubs" as={NavLink} to="/search-clubs">Club Finder</NavDropdown.Item>
                <NavDropdown.Item id="my-clubs" as={NavLink} to="/my-clubs">My Clubs</NavDropdown.Item>
                <NavDropdown.Item id="add-clubs" as={NavLink} to="/create-club">Start Club</NavDropdown.Item>
              </NavDropdown>
            )}

            {currentUser && (
              <NavDropdown title="Events" id="nav-dropdown-events">
                <NavDropdown.Item id="event-finder" as={NavLink} to="/upcoming-events">Event Finder</NavDropdown.Item>
                <NavDropdown.Item id="event-calendar" as={NavLink} to="/calender-events">Event Calendar</NavDropdown.Item>
                <NavDropdown.Item id="my-events" as={NavLink} to="/user-events">My Events</NavDropdown.Item>
                <NavDropdown.Item id="create-event" as={NavLink} to="/create-event">Start Event</NavDropdown.Item>
              </NavDropdown>
            )}

            {isAdmin && (
              <Nav.Link as={NavLink} to="/admin">Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            {/* <Nav.Link as={NavLink} to="/notifications" className="no-shadow"> */}
            {/*  <Bell /> */}
            {/* </Nav.Link> */}
            {/* <Form className="d-flex"> */}
            {/*  <FormControl */}
            {/*    type="search" */}
            {/*    placeholder="Search" */}
            {/*    className="me-2" */}
            {/*    aria-label="Search" */}
            {/*  /> */}
            {/*  <Button variant="outline-success"><Search /></Button> */}
            {/* </Form> */}
            <NavDropdown
              title={
                currentUser ? (
                  profile ? (
                    <Image src={profile.picture || 'public/images/defaultprofilepic.png'} className="profilePicture" />
                  ) : (
                    //  if no profile found
                    <PersonFill />
                  )
                ) : (
                  'Sign In'
                )
              }
              id="nav-dropdown-profile"
            >
              {currentUser ? (
              // These items will only be shown when there is a logged-in user\

                <>
                  <NavDropdown.Item id="profile" as={NavLink} to="/Profilez">Profile</NavDropdown.Item>
                  <NavDropdown.Item id="nav-my-clubs" as={NavLink} to="/my-clubs">My Clubs</NavDropdown.Item>
                  <NavDropdown.Item id="nav-calendar-events" as={NavLink} to="/calender-events">Agenda</NavDropdown.Item>
                  <NavDropdown.Item id="nav-customize" as={NavLink} to="/profile">
                    <Gear /> Customize
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item id="navbar-current-user" as={NavLink} to="/SignOut">Logout</NavDropdown.Item>
                </>
              ) : (
                // This item will be shown when there is no logged-in user
                <>
                  <NavDropdown.Item id="nav-dropdown-profile-sign-in" as={NavLink} to="/SignIn">Sign In</NavDropdown.Item>
                  <NavDropdown.Item id="nav-dropdown-profile-sign-in" as={NavLink} to="/SignUp">Sign Up</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : <LoadingSpinner />; // Render a loading spinner while data is being fetched
};
export default NavBar;
