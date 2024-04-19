import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import { Profiles } from '../../api/profile/Profile';
import MakeCard from '../components/ProfileCard';
import LoadingSpinner from '../components/LoadingSpinner';

function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  // console.log(data);
  return _.extend({}, data);
}

const BuddyUp = () => {
  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    return {
      ready: sub1.ready(),
    };
  }, []);
  const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
  console.log(emails);
  const profileData = emails.map(email => getProfileData(email));
  // console.log(profileData);
  return ready ? (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-2">
        {_.sample(profileData.map((profile, index) => <MakeCard key={index} profile={profile} />))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default BuddyUp;
