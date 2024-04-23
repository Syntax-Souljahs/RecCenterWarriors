import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profile/Profile';
import ExerciseCard from '../components/ExerciseCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ExercisesPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Profiles.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  /* Test data until we have a populated exercise collection */
  const testEx = [
    {
      name: 'Push Ups',
      description: 'Push Ups',
      category: 'Strength',
      difficulty: 'Beginner',
      _id: '123',
    },
    {
      name: 'Treadmill',
      description: 'Treadmill',
      category: 'Cardio',
      difficulty: 'Intermediate',
      _id: '124',
    },
  ];
  return (ready ? (
    <Container id="exercises-page">
      <Row xs={1} md={2} lg={4} className="g-2">
        {testEx.map((exercise) => <ExerciseCard key={exercise._id} exercise={exercise} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ExercisesPage;
