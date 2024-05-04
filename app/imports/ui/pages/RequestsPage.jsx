import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import RequestCard from '../components/RequestCard';
import { Requests } from '../../api/requests/Requests';
import { BuddyProfiles } from '../../api/profile/BuddyProfiles';

function getProfileData(username) {
  const data = BuddyProfiles.collection.findOne({ username });
  // console.log(data);
  return _.extend({}, data);
}

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const RequestsPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const sub1 = Meteor.subscribe(Requests.userPublicationName);
    const sub2 = Meteor.subscribe(BuddyProfiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = sub1.ready() && sub2.ready();
    // Get the Stuff documents
    return {
      ready: rdy,
    };
  }, []);
  /* Creates an array of usernames that has sent the user a request */
  const usernames = _.pluck(Requests.collection.find().fetch(), 'owner');
  // console.log(usernames);
  const profileData = usernames.map(username => getProfileData(username));
  // console.log(profileData);
  return (ready ? (
    <Container id="requests-page">
      <Row xs={1} md={2} lg={4} className="g-2">
        {profileData.map((profile) => <Col><RequestCard key={profile._id} profile={profile} /></Col>)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default RequestsPage;
