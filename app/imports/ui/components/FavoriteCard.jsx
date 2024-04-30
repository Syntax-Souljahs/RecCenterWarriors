import React from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FavoriteCard = ({ exercise }) => (
  <Col className="py-3">
    <Card>
      <Card.Header>
        {exercise.name}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Description</strong>
          <br />
          {exercise.description}
          <br /><br />
          <strong>Category</strong>
          <br />
          {exercise.category}
          <br /><br />
          <strong>Difficulty</strong>
          <br />
          {exercise.difficulty}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button className="mx-1" variant="info">Video</Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  </Col>
);

FavoriteCard.propTypes = {
  exercise: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
};

export default FavoriteCard;
