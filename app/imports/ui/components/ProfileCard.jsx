import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Component for layout out a Profile Card. */
const MakeCard = ({ profile }) => (
  <Col className="py-3">
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <b>Year</b> <br /> {profile.year}
          <br /> <br />
          <b>Major</b> <br /> {profile.major}
          <br /> <br />
          <b>Interests</b> <br /> {profile.interests}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button>Buddy Up</Button>
      </Card.Footer>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    interests: PropTypes.string,
    year: PropTypes.string,
    major: PropTypes.string,
  }).isRequired,
};

export default MakeCard;
