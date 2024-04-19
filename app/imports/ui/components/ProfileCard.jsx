import React from 'react';
import { Col, Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

/* Component for layout out a Profile Card. */
const MakeCard = ({ profile }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {profile.interests}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

MakeCard.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    interests: PropTypes.string,
  }).isRequired,
};

export default MakeCard;
