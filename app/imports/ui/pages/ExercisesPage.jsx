import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import { Stuffs } from '../../api/stuff/Stuff';
import ExerciseCard from '../components/ExerciseCard';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ExercisesPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  const testEx = [
    {
      name: 'Push Ups',
      description: 'Push Ups',
      category: 'Strength',
      difficulty: 'Beginner',
    },
    {
      name: 'Treadmill',
      description: 'Treadmill',
      category: 'Cardio',
      difficulty: 'Intermediate',
    },
  ];
  return (ready ? (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-2">
        {testEx.map((exercise) => <ExerciseCard exercise={exercise} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ExercisesPage;
