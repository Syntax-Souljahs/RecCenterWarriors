import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ProfileItem = ({ profile }) => (
  <Card>
    <Card.Body>
      <Row>
        <Col>
          <p>Username: {profile.username}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>First Name: {profile.firstName}</p>
        </Col>
        <Col>
          <p>Last Name: {profile.lastName}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Year: {profile.year}</p>
        </Col>
        <Col>
          <p>Major: {profile.major}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Email: {profile.email}</p>
        </Col>
        <Col>
          <p>Interests: {profile.interests}</p>
        </Col>
      </Row>
      <Link to={`/editprofile/${profile._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ProfileItem.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    year: PropTypes.string,
    major: PropTypes.string,
    email: PropTypes.string,
    interests: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfileItem;
