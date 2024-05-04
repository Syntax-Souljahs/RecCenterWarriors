import React from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RemoveFavorite from './RemoveFavorite';

const FavoriteCard = ({ exercise }) => (
  <Col className="py-3">
    <Card>
      <Card.Header>
        {exercise.name}
      </Card.Header>
      <Card.Body>
        <Card.Img src={exercise.image_url} />
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
            <Button className="mx-1" variant="info" href={exercise.video_url}>Video</Button>
          </Col>
          <Col>
            <RemoveFavorite name={exercise.name} />
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
    image_url: PropTypes.string,
    video_url: PropTypes.string,
  }).isRequired,
};

export default FavoriteCard;
