import React from 'react';
import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer id="footer-page" className="mt-auto py-3">
    <Container className="bg-transparent text-light">
      <Col className="text-center">
        Syntax Souljahs
        {' '}
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        {' '}
        <br />
        <a href="https://syntax-souljahs.github.io/" className="text-light">
          Home
          Page
        </a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
