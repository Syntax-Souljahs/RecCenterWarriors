import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { BuddyProfiles } from '../../api/profile/BuddyProfiles';
import MakeCard from '../components/ProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';

function getProfileData(username) {
  const data = BuddyProfiles.collection.findOne({ username });
  // console.log(data);
  return _.extend({}, data);
}

const BuddyUp = () => {
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(BuddyProfiles.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);
  const usernames = _.without(_.pluck(BuddyProfiles.collection.find().fetch(), 'username'), currentUser);
  console.log(usernames);
  const profileData = usernames.map(username => getProfileData(username));
  // console.log(profileData);
  return ready ? (
    <Container id="buddy-up-page">
      <Row xs={1} md={2} lg={4} className="g-2">
        {(profileData.map((profile, index) => <MakeCard key={index} profile={profile} />))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BuddyUp;
