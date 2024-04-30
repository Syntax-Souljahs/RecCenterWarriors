import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import ExerciseCard from '../components/ExerciseCard';
import { Exercises } from '../../api/exercises/Exercises';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ExercisesPage = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, exercises } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Exercises.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const exerciseItems = Exercises.collection.find({}).fetch();
    return {
      exercises: exerciseItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="exercises-page">
      <Row xs={1} md={2} lg={4} className="g-2">
        {exercises.map((exercise) => <ExerciseCard key={exercise._id} exercise={exercise} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ExercisesPage;
