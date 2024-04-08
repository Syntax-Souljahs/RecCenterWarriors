import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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
        <h5>Getting Started</h5>
      </Col>
      <Col xs={6}>
        <h6>To get started, sign in to your account</h6>
        <h6>If you don&apos;t have an account, you can create one <Link to="/signin">here</Link>.</h6>
      </Col>
    </Row>
  </Container>
);

export default Guide;
