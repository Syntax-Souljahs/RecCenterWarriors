import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Profiles } from '../../api/profile/Profile';
import { Card } from '/components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const BuddyUp = () => {
  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);
  return ready ? (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-2">
        {_.sample(Profiles.map((profile, index) => <Card key={index} profile={profile} />))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BuddyUp;
