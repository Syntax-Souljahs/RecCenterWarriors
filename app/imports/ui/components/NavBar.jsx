import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown, Image, Badge } from 'react-bootstrap';
import { BoxArrowRight, PeopleFill, PersonFill, PersonPlusFill, PersonSquare, StarFill } from 'react-bootstrap-icons';
import { Requests } from '../../api/requests/Requests';
import LoadingSpinner from './LoadingSpinner';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Requests.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);
  return ready ? (
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
              [
                <Nav.Link id="exercises-nav" as={NavLink} to="/exercises" key="exercises">Exercises</Nav.Link>,
                <Nav.Link id="buddy-up-nav" as={NavLink} to="/buddy-up" key="buddy-up">Buddy Up</Nav.Link>,
                <Nav.Link id="guide-nav" as={NavLink} to="/guide" key="guide">Guide</Nav.Link>,
              ]
            ) : (
              [
                <Nav.Link id="list-stuff-nav" as={NavLink} to="/exercises" key="exercises">Exercises</Nav.Link>,
                <Nav.Link id="guide-nav" as={NavLink} to="/guide" key="guide">Guide</Nav.Link>,
              ]
            )}
            {Roles.userIsInRole(Meteor.userId(), 'admin') && (
              <Nav.Link id="list-stuff-admin-nav" as={NavLink} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav className="justify-content-end">
            {/* New navbar item for logged-in users */}
            {currentUser !== '' && (
              <>
                <Nav.Link id="workout-schedule-nav" as={NavLink} to="/workout-sched">
                  Workout Schedule
                </Nav.Link>
                <NavDropdown id="navbar-current-user" title={currentUser}>
                  <NavDropdown.Item id="navbar-view-profile" as={NavLink} to="/viewprofile">
                    <PersonSquare />
                    View Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item id="navbar-view-favorite-exercies" as={NavLink} to="/viewfavoriteexercises">
                    <StarFill />
                    Favorite Exercises
                  </NavDropdown.Item>
                  <NavDropdown.Item id="navbar-view-requests" as={NavLink} to="/requests">
                    <PeopleFill />
                    Requests
                    <Badge bg="info">{Requests.collection.find().count()}</Badge>
                  </NavDropdown.Item>
                  <NavDropdown.Item id="navbar-sign-out" as={NavLink} to="/signout">
                    <BoxArrowRight />
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {/* Dropdown for login/logout */}
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
            ) : (
              null // No action needed here since it's handled in the logged-in condition above
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : <LoadingSpinner />;
};

export default NavBar;
