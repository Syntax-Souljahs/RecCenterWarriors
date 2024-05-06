import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Row, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RemoveRequest from './RemoveRequest';
import AddBuddy from './AddBuddy';
/* Component for layout out a Profile Card. */
const RequestCard = ({ profile }) => (
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
        <Row>
          <Col><AddBuddy owner={profile.username} buddy={Meteor.user().username} /></Col>
          <Col><RemoveRequest owner={profile.username} /></Col>
        </Row>
      </Card.Footer>
    </Card>
  </Col>
);

RequestCard.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    interests: PropTypes.string,
    year: PropTypes.string,
    major: PropTypes.string,
  }).isRequired,
};

export default RequestCard;
