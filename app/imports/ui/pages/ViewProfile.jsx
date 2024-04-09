import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profile/Profile';
import ProfileItem from '../components/ProfileItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ViewProfile = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, profiles } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const profileItems = Profiles.collection.find({}).fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="view-profile-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Your Profile</h2>
          </Col>
          {profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} /> // Pass profile instead of stuff
          ))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ViewProfile;
