import React from 'react';
import { Container, Row, Col, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Guide = () => (
  <Container id="guide-page" fluid>
    <Row className="justify-content-center text-center">
      <Col xs={6}>
        <h1>Guide</h1>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col xs={2}>
        <Nav id="side-bar" className="flex-column">
          <Nav.Link href="#getting-started">Getting Started</Nav.Link>
          <Nav.Link href="#find-a-buddy">Find A Buddy</Nav.Link>
          <Nav.Link href="#exercises">Exercises</Nav.Link>
          <Nav.Link href="#workout-schedule">Workout Schedule</Nav.Link>
          <Nav.Link href="#view-profile">View Profile</Nav.Link>
        </Nav>
      </Col>
      <Col xs={6}>
        <Nav className="flex-column">
          <Nav.Item as="h1" id="getting-started">Getting Started</Nav.Item>
          <Nav.Item>To get started, <Link to="/signin">Login</Link> to your account.</Nav.Item>
          <Nav.Item>If you don&apos;t have an account, you can register for one <Link to="/signup">here</Link>.</Nav.Item>
          <Nav.Item as="h1" id="find-a-buddy">Find A Buddy</Nav.Item>
          <Nav.Item>
            Here you can look for other Rec Center Warriors to workout with. <br />
            You can view their profiles.
          </Nav.Item>
          <Nav.Item as="h1" id="exercises">Exercises</Nav.Item>
          <Nav.Item as="h1" id="workout-schedule">Workout Schedule</Nav.Item>
          <Nav.Item as="h1" id="view-profile">View Profile</Nav.Item>
          <Nav.Item>You can check your profile here:</Nav.Item>
          <Image src="/images/view-profile-link.jpeg" />
          <Nav.Item>Here you can view your information.</Nav.Item>
        </Nav>
      </Col>
    </Row>
  </Container>
);

export default Guide;
