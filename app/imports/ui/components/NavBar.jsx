import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <Image roundedCircle src="/images/campus-center.png" width="50px" />
          <span className="ms-2" style={{ fontWeight: 'bold' }}>Rec Center Warriors</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser ? (
              <>
                <Nav.Link id="add-stuff-nav" as={NavLink} to="/add">Find A Buddy</Nav.Link>
                <Nav.Link id="list-stuff-nav" as={NavLink} to="/list">Exercises</Nav.Link>
              </>
            ) : (
              <Nav.Link id="list-stuff-nav" as={NavLink} to="/list">Exercises</Nav.Link>
            )}
            {Roles.userIsInRole(Meteor.userId(), 'admin') && (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser !== '' && (
              <>
                <Nav.Link as={NavLink} to="/workout-sched">Workout Schedule</Nav.Link>
                <NavDropdown id="navbar-current-user" title={currentUser}>
                  <NavDropdown.Item id="navbar-view-profile" as={NavLink} to="/viewprofile">
                    <PersonFill />
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                    <BoxArrowRight />
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {currentUser === '' ? (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
