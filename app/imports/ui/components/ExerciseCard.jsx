import React from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import AddFavorite from './AddFavorite';

const ExerciseCard = ({ exercise }) => (
  <Col className="py-3">
    <Card>
      <Card.Header>
        {exercise.name}
      </Card.Header>
      <Card.Body>
        <image src={exercise.image_url} />
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
            <AddFavorite name={exercise.name} category={exercise.category} description={exercise.description} difficulty={exercise.difficulty} owner={Meteor.user().username} />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  </Col>
);

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    image_url: PropTypes.string,
    video_url: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ExerciseCard;
