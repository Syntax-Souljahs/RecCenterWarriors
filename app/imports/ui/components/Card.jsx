import React from 'react';
import { Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Card = () => (
  <Container className="py-3">
    <Row>
      <div className="col-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Some Exercise K</h5>
            <p className="card-text">Assume for all K in W.Eapp</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </Row>
  </Container>
);

export default Card;
