import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Bell, Person, Gear, Search } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const NavBar = () => {
  const { currentUser, isAdmin } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
    isAdmin: Roles.userIsInRole(Meteor.userId(), 'admin'),
  }), []);

  return (
    <Navbar expand="lg" className="dark-green-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          UHnify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="ClubHub">
              <NavDropdown.Item as={NavLink} to="/search-clubs">Club Finder</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/club-recommendations">Picks for You</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/create-club">Start Club</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Events" id="nav-dropdown-events">
              <NavDropdown.Item as={NavLink} to="/upcoming-events">Coming Up</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/todays-events">On Today</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/create-event">Organize</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/my-clubs" className="no-shadow">My Clubs</Nav.Link>
            {isAdmin && (
              <Nav.Link as={NavLink} to="/admin">Dashboard</Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/notifications" className="no-shadow">
              <Bell />
            </Nav.Link>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success"><Search /></Button>
            </Form>
            <NavDropdown title={<Person />} id="nav-dropdown-profile">
              <NavDropdown.Item as={NavLink} to="/user/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/user/my-clubs">My Clubs</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/user/my-events">Agenda</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/user/settings">
                <Gear /> Customize
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/SignOut">
                Logout
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/SignIn">
                Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
