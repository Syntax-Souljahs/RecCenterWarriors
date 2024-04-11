import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* A simple static component to render some text for the landing page. */

const Landing = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Container id="landing-page" fluid className="py-3">
      {currentUser === '' ? (
        <Row className="align-middle text-center">
          <Col xs={2} />
          <Col xs={8} className="d-flex flex-column justify-content-center">
            <h1>Welcome to Rec Center Warriors</h1>
            <h3>
              Get started by clicking <br />
              one of the buttons below <br />
              and be on your way to <br />
              finding a great workout partner!
            </h3>
          </Col>
          <Row className="align-middle">
            <Col xs={5} />
            <Col xs={1}>
              <Button as={Link} size="lg" variant="dark">Guide</Button>
            </Col>
            <Col xs={1}>
              <Button as={Link} size="lg" variant="dark" style={{ whiteSpace: 'nowrap' }} to="/SignUp">Sign Up</Button>
            </Col>
          </Row>
        </Row>
      ) : (
        <Row className="align-middle text-center">
          <Col xs={2} />
          <Col xs={8}>
            <h1>Welcome back {currentUser}</h1>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Landing;
